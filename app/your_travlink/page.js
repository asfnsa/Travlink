"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoCopyOutline } from "react-icons/io5";
import Navbar from "@/components/Navbar";

const your_travlink = () => {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const [travlink, settravlink] = useState({
    handle: "",
    description: "",
    links: [],
    linkName: "",
    profilePicture: "",
  });
  const [allTravlinks, setAllTravlinks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const fileinputref = useRef(null);

  const addNewLink = () => {
    settravlink({
      ...travlink,
      links: [...travlink.links, { link: "", linkName: "" }],
    });
  };

  const fetchTravlinks = async () => {
    try {
      const res = await fetch("/api/link", { method: "GET" });
      const data = await res.json();
      if (data.success) {
        console.log("GET data:", data.data);
        setAllTravlinks(data.data); // 👈 MongoDB se aaya data state me daal do
      }
    } catch (err) {
      console.error("GET error:", err);
    }
  };
  useEffect(() => {
    fetchTravlinks();
  }, []); // 👈 empty dependency array => sirf ek baar chalega

  // ✅ Submit function same hi rahega...

  const submitTravlink = async () => {
    if (!travlink.handle.trim()) {
      alert("Handle name is required!");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      handle: travlink.handle,
      description: travlink.description || "",
      links: travlink.links,
      profilePicture: travlink.profilePicture || "",
    });

    try {
      let response;
      if (isEditing && editId) {
        // UPDATE
        response = await fetch(`/api/link?id=${editId}`, {
          method: "PUT",
          headers: myHeaders,
          body: raw,
        });
      } else {
        // CREATE
        response = await fetch("/api/link", {
          method: "POST",
          headers: myHeaders,
          body: raw,
        });
      }

      const result = await response.json();
      console.log(result);

      settravlink({
        handle: "",
        description: "",
        links: [],
        profilePicture: "",
      });
      setIsEditing(false);
      setEditId(null);
      if (fileinputref.current) fileinputref.current.value = "";
      fetchTravlinks();
      alert(result.message);
    } catch (error) {
      console.log("error", error);
      alert("Something went wrong");
    }
  };

  const deleteTravlink = async (id, handle) => {
    const confirmDelete = confirm(
      `Are you sure you want to permanently delete ${handle}?`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/link?id=${id}`, { method: "DELETE" });
      const result = await response.json();
      alert(result.message);
      fetchTravlinks();
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };
  const editTravlink = (user) => {
    settravlink({
      handle: user.handle,
      description: user.description,
      links: user.links,
      profilePicture: user.profilePicture,
    });
    setIsEditing(true);
    setEditId(user._id); // mongo ka id
  };

  const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert("Link copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
};

  return (
    <>
      <Navbar />
      <div>
        <h1 className="text-[16px] md:text-3xl font-bold text-center my-5 md:my-10">
          This is your travlink page
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-1.5 md:px-10 pb-10">
          <div className=" p-4 w-[90%] md:w-[40vw] min-h-[50%] md:min-h-[60vh] border-[1px] rounded-[6px] md:rounded-xl flex flex-col gap-2 md:gap-4">
            <div className="flex flex-col gap-2">
              <span className="font-semibold md:text-[16px] text-[10px]">
                1. handle
              </span>
              <input
                value={travlink.handle}
                onChange={(e) =>
                  settravlink({ ...travlink, handle: e.target.value })
                }
                className="border-[1px] md:text-[16px] text-[10px] rounded-full focus:outline-2 outline-blue-500 w-1/2 py-0.5 px-1 md:p-2"
                type="text"
                placeholder="Enter your handle"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold md:text-[16px] text-[10px]">
                2. Description
              </span>
              <input
                value={travlink.description}
                onChange={(e) =>
                  settravlink({ ...travlink, description: e.target.value })
                }
                className="border-[1px] md:text-[16px] text-[10px] rounded-full focus:outline-2 outline-blue-500 w-full py-0.5 px-1 md:p-2"
                type="text"
                placeholder="Enter your description"
              />
            </div>
            {travlink.links.map((l, index) => (
              <div key={index} className="flex w-full gap-1.5 md:gap-2.5">
                <div className="flex flex-col gap-2">
                  <span className="font-semibold md:text-[16px] text-[10px]">
                    Link {index + 1}
                  </span>
                  <input
                    value={l.link}
                    onChange={(e) => {
                      const updatedLinks = [...travlink.links];
                      updatedLinks[index].link = e.target.value;
                      settravlink({ ...travlink, links: updatedLinks });
                    }}
                    className="border-[1px] md:text-[16px] text-[10px] w-[40vw] md:w-[20vw] rounded-full focus:outline-2 outline-blue-500 py-0.5 px-1 md:p-2"
                    type="text"
                    placeholder="Enter your Link"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-semibold md:text-[16px] text-[10px]">
                    Link name {index + 1}
                  </span>
                  <input
                    value={l.linkName}
                    onChange={(e) => {
                      const updatedLinks = [...travlink.links];
                      updatedLinks[index].linkName = e.target.value;
                      settravlink({ ...travlink, links: updatedLinks });
                    }}
                    className="border-[1px] md:w-[17vw] w-[35vw] md:text-[16px] text-[10px] rounded-full focus:outline-2 outline-blue-500 py-0.5 px-1 md:p-2"
                    type="text"
                    placeholder="Enter your Link name"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={() => addNewLink()}
              className="w-full bg-blue-500 text-white rounded-full md:text-[18px] text-[10px] py-0.5 md:py-1.5 font-bold"
            >
              Add Link
            </button>
            <div className="flex flex-col gap-2">
              <span className="font-semibold md:text-[16px] text-[10px]">
                3. profile picture
              </span>
              <input
                ref={fileinputref}
                id="picture"
                className="border-[1px] md:text-[16px] text-[10px] rounded-full  py-0.5 px-1 md:p-2"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      settravlink({
                        ...travlink,
                        profilePicture: reader.result,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
            <div className="w-full flex justify-center mt-4">
              <button
                onClick={() => submitTravlink()}
                className="md:w-[200px]  bg-blue-500 text-white rounded-2xl md:text-[18px] text-[10px] border-2 border-blue-700 font-semibold py-1 px-2 md:py-2 md:px-4"
              >
                Create your Travlink
              </button>
            </div>
          </div>
          <div className="p-1 md:p-2.5 w-[90%] md:w-[40vw]  min-h-[50%] md:min-h-[60vh] border-[1px] rounded-[6px] md:rounded-xl flex flex-col">
            <h1 className="text-lg md:text-2xl font-bold text-center my-1.5">
              your Travlink:
            </h1>

            <div className="flex flex-col gap-4 h-[30vh] md:h-[49vh] px-1 md:px-5 overflow-y-scroll">
              {allTravlinks.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 text-[14px] md:text-2xl font-semibold">
                    No Travlinks found!
                  </p>
                </div>
              )}
              {allTravlinks.map((user, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start gap-1.5 border-b pb-2"
                >
                  <div className="p-1 w-full flex justify-between items-center">
                    <a
                      href={
                        user.handle
                          ? `${baseUrl}/${user.handle}`
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-[95%]  rounded-[3px] md:rounded-[6px] px-1.5 border text-[10px] md:text-[16px] py-0.5 md:py-1 font-medium"
                    >
                      {index + 1}. {baseUrl}/{user.handle}
                    </a>
                    <IoCopyOutline onClick={() => copyToClipboard(`${baseUrl}/${user.handle}`)} className="text-gray-500 text-[14px] p-[0.3px] md:text-2xl hover:text-gray-700 cursor-pointer" />
                  </div>

                  <div className="flex w-full gap-1.5 ">
                    <button
                      onClick={() => deleteTravlink(user._id, user.handle)}
                      className="bg-blue-400 rounded-[3px] md:rounded-[6px] text-white w-1/2 hover:bg-blue-500 px-2 py-0.5 font-bold md:text-[16px] text-[10px]"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => editTravlink(user)}
                      className="bg-blue-400 rounded-[3px] md:rounded-[6px] text-white w-1/2 hover:bg-blue-500 px-2 py-0.5 font-bold md:text-[16px] text-[10px]"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default your_travlink;
