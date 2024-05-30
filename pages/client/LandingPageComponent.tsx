import { getProducts } from "@/actions/get-products";
import { auth, signOut } from "@/auth";
import LoginButton from "@/components/auth/login-button";
import LandingAboutSection from "@/components/landing-about-section";
import LandingFirstSection from "@/components/landing-first-section";
import LandingWhyChooseUsSection from "@/components/landing-why-choose-us";

export default async function LandingPageComponent() {
  return (
    <main className=" min-h-screen">
      <LandingFirstSection />
      <LandingAboutSection />
      <LandingWhyChooseUsSection />
    </main>
  );
}
