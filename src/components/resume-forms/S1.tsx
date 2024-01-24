export default function S1() {
  return (
    <div className="border rounded-md m-6 py-12 px-6 border-gray-900/10 bg-indigo-500">
      <h2 className="text-base font-semibold leading-7 text-white">
        General Information
      </h2>
      {/* <p className="mt-1 text-sm leading-6 text-white">
            This information will be displayed publicly so be careful what you share.
          </p> */}
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-white"
          >
            Full Name
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="janesmith"
              />
            </div>
          </div>
        </div>
        <div className="col-span-full">
          <label
            htmlFor="about"
            className="block text-sm font-medium leading-6 text-white"
          >
            About
          </label>
          <div className="mt-2">
            <textarea
              id="about"
              name="about"
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-white">
            Write a few sentences about yourself.
          </p>
        </div>
      </div>
    </div>
  );
}
