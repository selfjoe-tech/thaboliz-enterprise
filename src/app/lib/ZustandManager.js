// stores/useStore.js
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

/**
 * Store shape:
 *  - user: { name: string|null, phone: string|null }
 *  - cart: [{ id, productId, name, price, quantity, meta?, image?, weight?, description? }]
 *  - addresses: [{ id, line1, line2, city, postalCode, country, phone, isDefault }]
 *
 * Actions:
 *  - setName, setPhone, setUser, setLogIn, logOut
 *  - addItem, updateItemQuantity, setItemQuantity (alias), removeItem, clearCart, setCart
 *  - addAddress, updateAddress, removeAddress, setDefaultAddress, setAddresses
 *  - getCartTotal, getCartCount, getItem
 *  - exportStore, importStore, clearAll
 */

export const useStore = create(
  persist(
    (set, get) => ({
      // --- state ---
      user: { name: null, phone: null },
      cart: [],
      addresses: [],
      isLoggedIn: false,

      // --- user actions ---
      setName: (name) => set((s) => ({ user: { ...s.user, name } })),
      setPhone: (phone) => set((s) => ({ user: { ...s.user, phone } })),
      setUser: (user) =>
        set(() => ({ user: { name: user?.name ?? null, phone: user?.phone ?? null } })),
      setLogIn: () => set(() => ({ isLoggedIn: true })),

      logOut: () =>
        set(() => ({
          user: { name: null, phone: null },
          cart: [],
          addresses: [],
          isLoggedIn: false,
        })),

      // --- cart actions ---
      // item shape: { id, productId, name, price, quantity, meta, image, weight, description }
      addItem: (item) => {
        set((s) => {
          const idx = s.cart.findIndex(
            (it) =>
              it.productId === item.productId &&
              JSON.stringify(it.meta || {}) === JSON.stringify(item.meta || {})
          );

          if (idx !== -1) {
            const cart = [...s.cart];
            cart[idx] = {
              ...cart[idx],
              quantity: (cart[idx].quantity || 0) + (item.quantity || 1),
            };
            return { cart };
          }

          const newItem = {
            id: item.id || nanoid(),
            productId: item.productId,
            name: item.name,
            price: Number(item.price || 0),
            quantity: item.quantity || 1,
            meta: item.meta || {},
            image: item.image || "",
            weight: item.weight || "",
            description: item.description || "",
          };

          return { cart: [...s.cart, newItem] };
        });
      },

      /**
       * updateItemQuantity expects the internal item id (id)
       * but we also expose setItemQuantity that accepts productId for convenience.
       */
      updateItemQuantity: (id, quantity) =>
        set((s) => ({ cart: s.cart.map((it) => (it.id === id ? { ...it, quantity } : it)) })),

      // alias: setItemQuantity(productId, qty)
      setItemQuantity: (productId, quantity) =>
        set((s) => ({
          cart: s.cart.map((it) =>
            it.productId === productId ? { ...it, quantity } : it
          ),
        })),

      // removeItem accepts an internal `id` OR a `productId` (convenience)
      removeItem: (idOrProductId) =>
        set((s) => ({
          cart: s.cart.filter(
            (it) => it.id !== idOrProductId && it.productId !== idOrProductId
          ),
        })),

      clearCart: () => set(() => ({ cart: [] })),

      setCart: (cartArray) =>
        set(() => ({ cart: Array.isArray(cartArray) ? cartArray : [] })),

      // convenience selectors/actions
      getCartTotal: () => {
        const s = get();
        return s.cart.reduce((sum, it) => sum + (Number(it.price || 0) * (it.quantity || 0)), 0);
      },

      getCartCount: () => {
        const s = get();
        return s.cart.reduce((sum, it) => sum + (it.quantity || 0), 0);
      },

      getItem: (productIdOrId) => {
        const s = get();
        return s.cart.find(
          (it) => it.productId === productIdOrId || it.id === productIdOrId
        );
      },

      // --- addresses ---
      addAddress: (address) =>
        set((s) => {
          const newAddr = {
            id: address.id || nanoid(),
            line1: address.line1 || "",
            line2: address.line2 || "",
            city: address.city || "",
            postalCode: address.postalCode || "",
            country: address.country || "",
            phone: address.phone || s.user?.phone || null,
            label: address.label || "",
            isDefault: !!address.isDefault,
          };

          // if this new address is default, clear other defaults
          const addresses = newAddr.isDefault
            ? s.addresses.map((a) => ({ ...a, isDefault: false })).concat(newAddr)
            : [...s.addresses, newAddr];

          // ensure there is at least one default
          if (addresses.length && !addresses.some((a) => a.isDefault)) {
            addresses[0].isDefault = true;
          }

          return { addresses };
        }),

      updateAddress: (id, patch) =>
        set((s) => {
          let addresses = s.addresses.map((a) => (a.id === id ? { ...a, ...patch } : a));
          // if patch sets isDefault true, clear other defaults
          if (patch?.isDefault) {
            addresses = addresses.map((a) => (a.id === id ? { ...a, isDefault: true } : { ...a, isDefault: false }));
          }
          return { addresses };
        }),

      removeAddress: (id) =>
        set((s) => {
          let addresses = s.addresses.filter((a) => a.id !== id);
          // ensure there's a default if still any addresses
          if (addresses.length && !addresses.some((a) => a.isDefault)) {
            addresses[0].isDefault = true;
          }
          return { addresses };
        }),

      setDefaultAddress: (id) =>
        set((s) => ({ addresses: s.addresses.map((a) => ({ ...a, isDefault: a.id === id })) })),

      setAddresses: (arr) => set(() => ({ addresses: Array.isArray(arr) ? arr : [] })),

      // --- export/import / debugging ---
      exportStore: () => {
        const s = get();
        return {
          user: s.user,
          cart: s.cart,
          addresses: s.addresses,
          isLoggedIn: s.isLoggedIn,
        };
      },

      importStore: (payload) =>
        set(() => ({
          user: payload.user ?? { name: null, phone: null },
          cart: Array.isArray(payload.cart) ? payload.cart : [],
          addresses: Array.isArray(payload.addresses) ? payload.addresses : [],
          isLoggedIn: !!payload.isLoggedIn,
        })),

      clearAll: () =>
        set(() => ({ user: { name: null, phone: null }, cart: [], addresses: [], isLoggedIn: false })),
    }),
    {
      name: "grocery-store-v1", // localStorage key
      version: 1,
      // optionally add migrate() here if you change schema later
    }
  )
);



// // stores/useStore.js
// import {create} from "zustand";
// import { persist } from "zustand/middleware";
// import { nanoid } from "nanoid"; // optional for generating IDs: npm i nanoid

// // shape of data:
// // - user: { name: string|null, phone: string|null }
// // - cart: [{ id, productId, name, price, quantity, meta? }]
// // - addresses: [{ id, label, line1, line2, city, postalCode, country, phone, isDefault }]
// //
// // Actions:
// // - setName, setPhone, clearUser
// // - addItem, removeItem, updateItemQuantity, clearCart, setCart
// // - addAddress, updateAddress, removeAddress, setDefaultAddress
// // - exportStore, importStore, clearAll

// export const useStore = create(
//   persist(
//     (set, get) => ({
//       // --- state ---
//       user: { name: null, phone: null },
//       cart: [],
//       addresses: [],
//       isLoggedIn: false,

//       // --- user actions ---
//       setName: (name) => set((s) => ({ user: { ...s.user, name } })),
//       setPhone: (phone) => set((s) => ({ user: { ...s.user, phone } })),
//       setUser: (user) => set(() => ({ user: { name: user.name ?? null, phone: user.phone ?? null } })),
//       setLogIn: () => set(() => ({ isLoggedIn: true })),

//       logOut: () => set(() =>({
//         user: { name: null, phone: null },
//         cart: [],
//         addresses: [],
//         isLoggedIn: false,
//       }) ),
//       // --- cart actions ---
//       // item shape: { id, productId, name, price, quantity, meta }
//       addItem: (item) => {
//         // if item with same productId + same meta exists, increase qty
//         set((s) => {
//           const idx = s.cart.findIndex(
//             (it) =>
//               it.productId === item.productId &&
//               JSON.stringify(it.meta || {}) === JSON.stringify(item.meta || {})
//           );
//           if (idx !== -1) {
//             const cart = [...s.cart];
//             cart[idx] = { ...cart[idx], quantity: cart[idx].quantity + (item.quantity || 1) };
//             return { cart };
//           }
//           const newItem = {
//             id: item.id || nanoid(),
//             productId: item.productId,
//             name: item.name,
//             price: item.price || 0,
//             quantity: item.quantity || 1,
//             meta: item.meta || {},
//             image: item.image || "",
//             weight: item.weight || "",
//             description: item.description || ""

//           };
//           return { cart: [...s.cart, newItem] };
//         });
//       },

//       updateItemQuantity: (id, quantity) =>
//         set((s) => ({ cart: s.cart.map((it) => (it.id === id ? { ...it, quantity } : it)) })),

//       removeItem: (id) => set((s) => ({ cart: s.cart.filter((it) => it.id !== id) })),

//       clearCart: () => set(() => ({ cart: [] })),

//       setCart: (cartArray) =>
//         set(() => ({ cart: Array.isArray(cartArray) ? cartArray : [] })),

//       // convenience selectors
//       getCartTotal: () => {
//         const s = get();
//         return s.cart.reduce((sum, it) => sum + (Number(it.price || 0) * (it.quantity || 0)), 0);
//       },

//       getCartCount: () => {
//         const s = get();
//         return s.cart.reduce((sum, it) => sum + (it.quantity || 0), 0);
//       },

//       // --- addresses ---
//       addAddress: (address) =>
//         set((s) => {
//           const newAddr = {
//             id: address.id || nanoid(),
//             street: address.line1 || "",
//             suburb: address.line2 || "",
//             city: address.city || "",
//             postalCode: address.postalCode || "",
//             country: address.country || "",
//             phone: address.phone || s.user?.phone || null,
//           };
//           // if isDefault, clear others

//           return {addresses: [...newAddr]}
          
//         }),

//       updateAddress: (id, patch) =>
//         set((s) => {
//           let addresses = s.addresses.map((a) => (a.id === id ? { ...a, ...patch } : a));
//           // if patch sets isDefault true, clear other defaults
//           if (patch.isDefault) {
//             addresses = addresses.map((a) => (a.id === id ? { ...a, isDefault: true } : { ...a, isDefault: false }));
//           }
//           return { addresses };
//         }),

//       removeAddress: (id) =>
//         set((s) => {
//           let addresses = s.addresses.filter((a) => a.id !== id);
//           // ensure there's a default if still any addresses
//           if (addresses.length && !addresses.some((a) => a.isDefault)) {
//             addresses[0].isDefault = true;
//           }
//           return { addresses };
//         }),

//       setDefaultAddress: (id) =>
//         set((s) => ({ addresses: s.addresses.map((a) => ({ ...a, isDefault: a.id === id })) })),

//       setAddresses: (arr) => set(() => ({ addresses: Array.isArray(arr) ? arr : [] })),

//       // --- export/import / debugging ---
//       exportStore: () => {
//         const s = get();
//         return {
//           user: s.user,
//           cart: s.cart,
//           addresses: s.addresses,
//         };
//       },

//       importStore: (payload) =>
//         set(() => ({
//           user: payload.user ?? { name: null, phone: null },
//           cart: Array.isArray(payload.cart) ? payload.cart : [],
//           addresses: Array.isArray(payload.addresses) ? payload.addresses : [],
//         })),

//       clearAll: () => set(() => ({ user: { name: null, phone: null }, cart: [], addresses: [] })),
//     }),
//     {
//       name: "grocery-store-v1", // localStorage key
//       version: 1,
//       // For Next.js, persist uses window.localStorage so it runs on client only.
//       // You can add migrate() here if you bump store shape later.
//     }
//   )
// );
