import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import Image from "next/image";

export default function ContactDetails() {
  return (
    <section id="contact" className="bg-black py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.7fr)] lg:gap-20">
          {/* Left: giant statement t*/}

<div>
  <h2 className="max-w-[8ch] text-6xl font-semibold leading-[0.88] tracking-tight text-white sm:text-7xl lg:text-[6.5rem] lg:leading-[0.9] xl:text-[7.5rem]">
    Talk to us
  </h2>

  <p className="mt-8 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
    Whether you’re planning infrastructure, upgrading systems, moving goods, or launching
    an energy initiative, we respond fast and execute with precision.
  </p>

  <div className="mt-10 max-w-xl overflow-hidden bg-white/[0.03]">
    <div className="relative aspect-[16/10] w-full">
      <Image
        src="/stock/home/pic-1.jpg"
        alt="Thaboliz team discussing a project"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 40vw"
      />
    </div>

    
  </div>
</div>

          {/* Right: contact details + form */}
          <div className="lg:pt-4">
            <div className="border-t border-white/10">
              <div className="border-b border-white/10 py-7">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white">
                    <Mail className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-xl font-semibold text-white">Email us</div>
                    <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
                      For proposals, partnerships, and general enquiries.
                    </p>
                    <Link
                      href="mailto:info@thaboliz.co.za"
                      className="mt-4 inline-block text-base text-white underline underline-offset-4 transition hover:text-white/80"
                    >
                      info@thaboliz.co.za
                    </Link>
                  </div>
                </div>
              </div>

              <div className="border-b border-white/10 py-7">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white">
                    <Phone className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-xl font-semibold text-white">Call us</div>
                    <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
                      Speak to a team member for urgent requests.
                    </p>
                    <Link
                      href="tel:+27100000000"
                      className="mt-4 inline-block text-base text-white underline underline-offset-4 transition hover:text-white/80"
                    >
                      +27 10 000 0000
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}