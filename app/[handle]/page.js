import { FaUserLarge } from "react-icons/fa6";

export default async function Page({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${params.handle}`,
    { cache: "no-store" } // fresh data hamesha
  );

  const json = await res.json();
  const user = json.data;

  if (!user) {
    return (
      <h1 className="text-center mt-10 text-2xl font-bold">
        User not found
      </h1>
    );
  }

  return (

    <div className="flex flex-col items-center min-h-screen bg-indigo-100 py-6">
      <h1 className="font-bold md:text-2xl text-[14px] py-5">Your travlink </h1>
      <div className="relative w-[280px] min-h-[400px] md:w-[390px] md:min-h-[480px] bg-white rounded-xl md:rounded-3xl shadow-xl overflow-hidden flex flex-col items-center p-1.5 md:p-6">

        {/* Background Layers */}
        <img
          src="https://img.freepik.com/free-photo/starry-clear-sky-view-with-nature-landscape_23-2151683113.jpg?t=st=1756552048~exp=1756555648~hmac=4cae0fb8add2d50c1635ee6ec957865baee587ef3babc322e48e80c260f95da2&w=1480"
          alt="bg layer 1"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          style={{ zIndex: 1 }}
        />
        <img
          src="https://img.freepik.com/free-photo/starry-clear-sky-view-with-nature-landscape_23-2151683113.jpg?t=st=1756552048~exp=1756555648~hmac=4cae0fb8add2d50c1635ee6ec957865baee587ef3babc322e48e80c260f95da2&w=1480"
          alt="bg layer 2"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          style={{ zIndex: 2 }}
        />

        {/* Avatar */}
        <div className="relative z-20 mt-10 mb-3">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.handle}
              className="md:w-26 md:h-26 w-20 h-20 rounded-full border-4 border-[#42657d] shadow-lg object-cover"
            />
          ) : (
            <div className="md:w-26 md:h-26 w-20 h-20 flex justify-center items-center rounded-full border-4 border-[#42657d] shadow-lg bg-gray-200">
              <FaUserLarge className="md:w-12 md:h-12 w-6 h-6 text-gray-500" />
            </div>
          )}
        </div>

        {/* User Info */}
        <p className="text-center text-[10px] md:text-[18px] font-semibold py-1 text-[white] z-20">
          @{user.handle}
        </p>
        <p className="w-[90%] text-center text-[8px] md:text-[14px] text-[#e6e5e5] z-20">
          {user.description}
        </p>

        {/* Links */}
        <div className="relative z-20 flex flex-col gap-2 w-full mt-4">
          {user.links.map((link, i) => (
            <a
              key={i}
              href={link.link}
              target="_blank"
              className="text-[10px] md:text-[16px] block w-[80%] mx-auto md:w-full text-center py-1 md:py-2 rounded-[4px] md:rounded-lg bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition"
            >
              {link.linkName || "Untitled"}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
