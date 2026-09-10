import Image from "next/image";

/** The client's original artwork, kept intact in every shared placement. */
export default function BrandMark() {
  return (
    <span className="brandmark" aria-hidden="true">
      <Image src="/assets/logo.png" alt="" width={406} height={332} sizes="180px" preload />
    </span>
  );
}
