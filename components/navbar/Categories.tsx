"use client";

import { CATEGORIES } from "@/data";
import Container from "../Container";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

function Categories() {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex items-center justify-between overflow-x-auto">
        {CATEGORIES.map((cat) => (
          <CategoryBox
            key={cat.label}
            label={cat.label}
            icon={cat.icon}
            selected={cat.label === category}
          />
        ))}
      </div>
    </Container>
  );
}

export default Categories;
