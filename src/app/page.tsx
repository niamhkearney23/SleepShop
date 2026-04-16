import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Practice } from "@/components/practice";
import { Approach } from "@/components/approach";
import { Credentials } from "@/components/credentials";
import { SelectedWork } from "@/components/selected-work";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Problem />
      <Practice />
      <Approach />
      <Credentials />
      <SelectedWork />
      <ContactForm />
      <Footer />
    </main>
  );
}
