import { ContactForm } from '@/components/contact-form';
import { Main } from '@/components/main';
import { ContactList } from '@/components/contact-list';
import Image from 'next/image';

const ContactPage = () => {
  return (
    <Main title="My Contact">
      <div className="flex basis-full gap-8 md:gap-16 flex-col md:flex-row">
        <div className="@container w-full min-w-xs">
          <div className="flex gap-8 items-center flex-col @lg:flex-row">
            <Image className="potrait" alt="Justin Case" src="/contact.png" width={200} height={200} />
            <p>
              I am always open to discussing new projects, collaborations, or opportunities.
              Feel free to reach out using any of the methods below, or use the contact form.
              I typically respond within 24-48 hours.
            </p>
          </div>
          <ContactList />
        </div>
        <ContactForm className="min-w-xs md:-mt-26" />
      </div>
    </Main>
  )
}

export default ContactPage;
