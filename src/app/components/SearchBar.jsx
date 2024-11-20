"use client";
import { useRef, useState } from "react";

const SearchBar = () => {
  const [loop, setLoop] = useState(false);
  const [enhancePrompt, setEnhancePrompt] = useState(true);
  const [images, setImages] = useState([]);
  const [text, setText] = useState("");
  const [showIdeas, setShowIdeas] = useState(false);
  const [ideaIndex, setIdeaIndex] = useState(0);

  const dummyIdeas = [
    " A teddy bear in sunglasses playing electric guitar, dancing and headbanging in the jungle in front of a large beautiful waterfall",
    " Fast FPV drone flythrough of a European castle, beginning with an aerial view of the towering stone walls and turrets, then gliding through an open window into the grand interior halls.",
    "An old lady laughing underwater, wearing a scuba diving suit, her expression denotes calm and happiness",
  ];

  const fileInputRef = useRef(null);
  const textAreaRef = useRef(null);

  const handleImageChange = (e) => {
    const maxSizeMB = 5;
    const files = Array.from(e.target.files);
    const newImages = files
      .filter(
        (file) =>
          file.type.startsWith("image/") && file.size <= maxSizeMB * 1024 * 1024
      )
      .map((file) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

    Promise.all(newImages)
      .then((imageDataURLs) => {
        setImages((prevImages) => {
          const updatedImages = [...prevImages, ...imageDataURLs];
          return updatedImages.slice(0, 2);
        });
      })
      .catch((error) => {
        console.error("Error reading files:", error);
      });
  };

  const triggerFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleTextChange = (e) => {
    const textarea = textAreaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setText(e.target.value);
  };

  const handleArrowClick = () => {
    setIdeaIndex((prevIndex) => (prevIndex + 1) % dummyIdeas.length);
  };
  const handleSubmit = () => {
    // console.log("Text:", text);
    // console.log("Images:", images);
  };
  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = null;
      return updatedImages;
    });
  };

  const handleSwapImages = () => {
    if (images.length === 2) {
      setImages((prevImages) => [prevImages[1], prevImages[0]]);
    }
  };
  return (
    <div className="">
      <div className="max-w-[896px] w-full flex mx-auto flex-col">
        {/* Input and image upload */}
        <div className="w-full mx-auto bg-[#ffffff26] items-center rounded-[28px]">
          {images.length > 0 && (
            <div className="max-w-[200px] w-full mt-[-50px] flex gap-7 ml-[22px]">
              {images.slice(0, 2).map((image, index) => (
                <div
                  key={index}
                  className="relative group max-w-[190px] w-full"
                >
                  {image ? (
                    <>
                      <img
                        src={image}
                        alt={`Uploaded ${index + 1}`}
                        className={`rounded-lg max-w-[82px] w-full max-h-[103px] h-full ${
                          index === 0 ? "rotate-[-5deg]" : "rotate-[5deg]"
                        } animate-scaleImg`}
                        style={{
                          animationDelay: `${index * 0.4}s`,
                        }}
                      />
                      <span
                        className="mt-[-100px] ml-[40px] absolute bg-[#404040] max-w-[31px] w-full rounded-[30px] flex items-center justify-center text-white text-xl cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(index)}
                      >
                        &times;
                      </span>
                    </>
                  ) : (
                    <div
                      className={`${
                        index === 0 ? "rotate-[-5deg]" : "rotate-[5deg]"
                      } rounded-lg max-w-[100px]   w-full h-[103px] text-[#fff]  bg-[#ffffff26] flex fle-col  cursor-pointer`}
                      onClick={() => triggerFileInputClick(index)}
                    >
                      <span className="text-[40px]">+</span>
                      <span>{index === 0 ? "Start Frame " : "End Frame"}</span>
                    </div>
                  )}
                </div>
              ))}

              {images.length === 2 && (
                <button
                  onClick={handleSwapImages}
                  className="ml-[77px] absolute text-white px-3 py-1 rounded-lg cursor-pointer"
                >
                  <svg
                    width="16"
                    height="6"
                    viewBox="0 0 16 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.59183 3.14494C4.86355 1.86844 6.41965 1.25001 7.95077 1.25C9.46622 1.24999 11.0061 1.85582 12.2706 3.10594L12.1798 3.19674L11.4154 3.96116C11.1792 4.19732 11.1108 4.42313 11.2103 4.63857C11.3138 4.84988 11.5231 4.98039 11.838 5.03011L14.6719 5.45271C14.9039 5.49415 15.0779 5.45686 15.194 5.34085C15.3058 5.22069 15.3452 5.04461 15.312 4.81259L14.8956 1.97242C14.8501 1.6534 14.7196 1.44416 14.5041 1.34473C14.2887 1.24529 14.0629 1.31365 13.8267 1.54982L13.1542 2.2223C11.671 0.753646 9.82316 -8.12944e-06 7.95076 0C6.06187 8.20121e-06 4.19798 0.767016 2.70819 2.2613L1.9967 1.54982C1.76054 1.31365 1.53474 1.24529 1.31929 1.34473C1.10384 1.44416 0.973332 1.6534 0.927756 1.97242L0.511364 4.81259C0.478219 5.04461 0.517579 5.22069 0.629446 5.34085C0.745455 5.45686 0.91947 5.49415 1.15149 5.45271L3.98544 5.03011C4.30032 4.98039 4.50956 4.84988 4.61314 4.63857C4.71257 4.42313 4.64421 4.19732 4.40805 3.96116L3.64363 3.19674L3.59183 3.14494Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              )}
            </div>
          )}

          <div className="w-full flex items-center px-[8px]">
            <div
              className="max-w-[45px] w-full flex justify-center cursor-pointer"
              onClick={triggerFileInputClick}
            >
              <input
                type="file"
                multiple
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

              {/* SVG content */}
              <svg
                className=""
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.8354 16.6387C20.8354 17.4355 20.6473 18.0387 20.271 18.4482C19.8947 18.8633 19.3302 19.0708 18.5776 19.0708H4.66553C4.04574 19.0708 3.58089 18.8799 3.271 18.498C2.9611 18.1217 2.79232 17.5573 2.76465 16.8047L5.92725 13.9492C6.0988 13.7887 6.27311 13.6725 6.4502 13.6006C6.62728 13.5231 6.8099 13.4844 6.99805 13.4844C7.19173 13.4844 7.38265 13.5259 7.5708 13.6089C7.76449 13.6864 7.9471 13.8026 8.11865 13.9575L9.6543 15.3438L13.4062 11.9902C13.5999 11.8242 13.7992 11.6997 14.0039 11.6167C14.2087 11.5337 14.4245 11.4922 14.6514 11.4922C14.8783 11.4922 15.0968 11.5365 15.3071 11.625C15.5229 11.708 15.7222 11.8353 15.9048 12.0068L20.8354 16.6387ZM8.30127 12.0898C7.94157 12.0898 7.6123 12.0041 7.31348 11.8325C7.02018 11.6554 6.78499 11.4175 6.60791 11.1187C6.43083 10.8198 6.34229 10.4906 6.34229 10.1309C6.34229 9.77669 6.43083 9.4502 6.60791 9.15137C6.78499 8.85254 7.02018 8.61458 7.31348 8.4375C7.6123 8.26042 7.94157 8.17188 8.30127 8.17188C8.66097 8.17188 8.98747 8.26042 9.28076 8.4375C9.57406 8.61458 9.80924 8.85254 9.98633 9.15137C10.1634 9.4502 10.252 9.77669 10.252 10.1309C10.252 10.4906 10.1634 10.8198 9.98633 11.1187C9.80924 11.4175 9.57406 11.6554 9.28076 11.8325C8.98747 12.0041 8.66097 12.0898 8.30127 12.0898ZM4.72363 19.6519C3.85482 19.6519 3.20182 19.436 2.76465 19.0044C2.33301 18.5783 2.11719 17.9391 2.11719 17.0869V6.94336C2.11719 6.08561 2.33301 5.44368 2.76465 5.01758C3.20182 4.58594 3.85482 4.37012 4.72363 4.37012H19.084C19.9583 4.37012 20.6113 4.58594 21.043 5.01758C21.4746 5.44922 21.6904 6.09115 21.6904 6.94336V17.0869C21.6904 17.9391 21.4746 18.5783 21.043 19.0044C20.6113 19.436 19.9583 19.6519 19.084 19.6519H4.72363ZM4.74023 18.3154H19.0674C19.4769 18.3154 19.7923 18.2075 20.0137 17.9917C20.2406 17.7703 20.354 17.4438 20.354 17.0122V7.01807C20.354 6.58643 20.2406 6.25993 20.0137 6.03857C19.7923 5.81722 19.4769 5.70654 19.0674 5.70654H4.74023C4.3252 5.70654 4.007 5.81722 3.78564 6.03857C3.56429 6.25993 3.45361 6.58643 3.45361 7.01807V17.0122C3.45361 17.4438 3.56429 17.7703 3.78564 17.9917C4.007 18.2075 4.3252 18.3154 4.74023 18.3154Z"
                  fill="#ffffff"
                ></path>
              </svg>
            </div>

            {/* Center-align the textarea */}
            <div className="flex-grow flex justify-center py-[16px]">
              <textarea
                ref={textAreaRef}
                rows={1}
                value={text}
                onChange={handleTextChange}
                // onFocus={() => setShowIdeas(false)}
                // onBlur={() => setShowIdeas(true)}
                placeholder="Type some text or add an image..."
                className="w-full  h-fit focus:outline-none text-[white] text-[17px] font-[500] bg-transparent resize-none overflow-hidden "
              />
            </div>

            <div className="relative size-[24px]  flex outline-none m-[8px] aspect-square pointer-events-auto transition-opacity">
              <div tabIndex="0">
                {/* submitt - SVG content */}
                <svg
                  onClick={handleSubmit}
                  disabled={!text || images.length === 0}
                  width="1em"
                  height="1em"
                  viewBox="0 0 25 25"
                  fill="none"
                  className={`size-[24px]  cursor-pointer ${
                    text ? "text-[#ffffff]" : "text-[#ffffff26]"
                  } `}
                >
                  <path
                    fill="currentColor"
                    fillOpacity="0.9"
                    d="M12.5 24.492q-2.45 0-4.617-.937a12.2 12.2 0 0 1-3.809-2.59 12.2 12.2 0 0 1-2.59-3.809 11.5 11.5 0 0 1-.937-4.617q0-2.45.937-4.605a12.3 12.3 0 0 1 2.579-3.82 12.2 12.2 0 0 1 3.808-2.59 11.5 11.5 0 0 1 4.617-.938q2.45 0 4.618.937a12.2 12.2 0 0 1 3.82 2.59 12.2 12.2 0 0 1 2.59 3.82q.937 2.157.937 4.606 0 2.45-.937 4.617a12.2 12.2 0 0 1-2.59 3.809 12.2 12.2 0 0 1-3.82 2.59 11.4 11.4 0 0 1-4.606.937m.023-5.918q.398 0 .645-.246a.9.9 0 0 0 .258-.668v-6.012l-.094-2.578 1.219 1.465 1.418 1.442q.246.27.644.27.375 0 .633-.247a.86.86 0 0 0 .258-.633.88.88 0 0 0-.246-.633l-4.031-4.007q-.34-.352-.704-.352t-.703.352l-4.03 4.007a.86.86 0 0 0-.247.633q0 .375.246.633a.88.88 0 0 0 .633.246.88.88 0 0 0 .644-.27l1.43-1.44 1.207-1.454-.094 2.566v6.012q0 .41.258.668.258.246.656.246"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* dummy-commands and loop */}
        <div className="flex space-x-4 mt-4 items-end ">
          {text && (
            <div className="justify-end flex w-full gap-[25px]">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={loop}
                  onChange={() => setLoop(!loop)}
                  className="form-checkbox"
                />
                <span className="text-white">Loop</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={enhancePrompt}
                  onChange={() => setEnhancePrompt(!enhancePrompt)}
                  className="form-checkbox"
                />
                <span className="text-white">Enhance prompt</span>
              </label>
            </div>
          )}

          {!text && (
            <div className="max-w-[864px] w-full flex items-center justify-between mt-2 gap-[20px] px-[15px]">
              <svg
                onClick={handleArrowClick}
                width="15"
                height="15"
                viewBox="0 0 15 15"
                className="cursor-pointer"
              >
                <path
                  d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z"
                  fill="#fff"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-white truncate  w-full">
                <span className="font-[700]">Idea :</span>{" "}
                {dummyIdeas[ideaIndex]}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
