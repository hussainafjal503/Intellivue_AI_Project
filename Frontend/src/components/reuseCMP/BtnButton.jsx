import React, { memo } from "react";

function BtnButton({
  children,
  bgcolor,
  hovercolor,
  textcolor,
  loading,
  spinner,
  handler
}) {
  // console.log(bgcolor,hovercolor,textcolor,loading,handler)
  // console.log(handler)
  //  console.log(children)
  
  return (
    <div>
      <button
        style={{
          backgroundColor: `var(${bgcolor})`,
          color: textcolor,
        }}
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor = `var(${hovercolor})`)
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = `var(${bgcolor})`)
        }
        onClick={handler}
        className={`rounded-md py-2 px-4 text-center  w-fit md:min-w-35 cursor-pointer transition-all duration hover:scale-90  font-bold`}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <div className={`${spinner}`}></div>
          </div>
        ) : (
          children
        )}
      </button>
    </div>
  );
}

export default memo(BtnButton);
