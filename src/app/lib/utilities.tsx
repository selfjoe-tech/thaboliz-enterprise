import Image from "next/image";

export function getIconForTitle(title: string) {
        const size = 64;
        const baseProps = { width: size, height: size, viewBox: '0 0 64 64', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': true };

        if (title === 'Local Sourcing') {
        // A small farm / leaf icon (barn + leaf)
        return (
                <Image className="inline-block" src={"/south africa icon.png"} width={54} height={54} alt="careful selection icon"/>
        );
        }

        if (title === 'Careful Selection') {
        // A hand picking a fruit with a small checkmark
        return (
            <Image className="inline-block" src={"/checklist.svg"} width={54} height={54} alt="careful selection icon"/>     
        );
        }

        // Default / 'Convenient Delivery'
        return (
            <Image className="inline-block" src={"/delivery_truck_speed_31dp_434343_FILL0_wght400_GRAD0_opsz24.svg"} 
                alt="Fast Truck Icon" 
                height={54}
                width={54}
            />
            
        );
}



