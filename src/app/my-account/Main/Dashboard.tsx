import React from "react";
import Heading from "./Heading";

export default function Dashboard() {
  return (
    <section className="w-full px-5 py-10">
      <Heading text="Dashboard" />
      <div>
        Hello <span className="font-semibold">yaseenJabir </span> (not
        <span className="font-semibold"> yaseenJabir?</span> Log out)
      </div>
      <p className="mt-5">
        From your account dashboard you can view your recent orders, manage your
        shipping and billing addresses, and edit your password and account
        details.
      </p>
    </section>
  );
}
