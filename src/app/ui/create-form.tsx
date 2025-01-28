export default function CreateForm() {
  return (
    <div className="border-solid border-black">
      <form action="" className=" w-3/5">
        <div className="renge-barra renge-barra-2 renge-barra-3 renge-barra-4 renge-barra-5 renge-barra 6">
          <label htmlFor="">
            home loan amount
            <input type="text" />
            {/* <input
              type="range"
              className="w-full h-2 bg-orange-500 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-orange-600 [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-orange-600 [&::-moz-range-thumb]:rounded-full"
              min="0"
              max="100"
              defaultValue="50"
            /> */}
            <div className="range-input">
              <span className="progress-before"></span>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="0"
                className=""
              />
              <span className="progress-after"></span>
            </div>
          </label>
        </div>
      </form>
    </div>
  );
}
