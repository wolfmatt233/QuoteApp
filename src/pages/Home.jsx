export default function Home() {
  return (
    <>
      <p className="text-2xl text-center mb-5">Welcome to QuoteScribe!</p>
      <div className="bg-black w-1/2 m-auto rounded-lg max-sm:w-full">
        <img
          src={"./banner.jpeg"}
          alt="image"
          className="opacity-50 rounded-lg"
        />
      </div>
      <div className="max-sm:w-full w-3/4 m-auto mt-5">
        <p className="text-center">
          QuoteScribe allows you to catalogue your favorite book quotes! Add a
          page number, add an image, add all the notes you want, or don't! It's
          all up to you! Share with your friends!
        </p>
      </div>
    </>
  );
}
