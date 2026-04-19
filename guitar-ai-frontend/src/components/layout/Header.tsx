import Topbar from "../Header/TopBar";
import MainHeader from "../Header/MainHeader";

export default function Header() {
  return (
    <header className="w-full fixed top-0 left-0 z-50">
      <Topbar />
      <MainHeader />
    </header>
  );
}