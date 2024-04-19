import Image from "next/image";

export default function MainSetDisplay({ image, title }) {
  return (
    <div
      className="col-span-1 w-full flex gap-5 border border-border rounded-xl p-5 hover:border-border-darker hover:bg-background-darker hover:cursor-pointer"
      onClick={() => {
        console.log("This is doing something");
      }}
    >
      <Image src={image} width={200} height={200} alt={`${title} Image`} />
      <div className="flex flex-col justify-between">
        <h4 className="font-medium">{title}</h4>
        <div>
          <p>Rating: ?</p>
          <p>Cost: ?</p>
          <p>Brick Count: ?</p>
        </div>
      </div>
    </div>
  );
}
