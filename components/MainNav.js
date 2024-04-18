import Image from "next/image";

export default function MainNav() {
  return (
    <div className="flex bg-neutral-500 justify-between px-5 py-2 border-b-2 border-black">
      <div className="flex items-center gap-3">
        <h1>BRICKS FOR US</h1>
        <Image src="/images/brick-icon.png" width={65} height={65} />
      </div>
      <div className="flex items-center gap-3">
        <button className="btn-primary" type="submit">
          Log Out
        </button>
        <Image src="/images/profilePic.png" width={60} height={60} />
      </div>
    </div>
  );
}
