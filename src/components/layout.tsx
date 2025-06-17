import { ReactElement } from "react";
import Navbar from "./nav-bar";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
