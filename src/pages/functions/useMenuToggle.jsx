import { useEffect, useState } from "react";

export default function useMenuToggle() {
  const [menuToggle, setMenuToggle] = useState("close-menu");
  const [burgerToggle, setBurgerToggle] = useState("burger-off");

  const handleBurger = () => {
    setMenuToggle((prev) =>
      prev === "close-menu" ? "show-menu" : "close-menu"
    );
    setBurgerToggle((prev) =>
      prev === "burger-off" ? "burger-on" : "burger-off"
    );
  };

  const closeMenu = () => {
    setMenuToggle("close-menu");
    setBurgerToggle("burger-off");
  };

  return { menuToggle, closeMenu, burgerToggle, handleBurger };
}
