export default function AuthModalInputs() {
  return (
    <div>
      <div className={"my-3 flex justify-between text-sm"}>
        <input className={"border rounded p-2 py-3 w-[49%]"}
               type="text"
               placeholder={"First Name"} />

        <input className={"border rounded p-2 py-3 w-[49%]"}
               type="text"
               placeholder={"Last Name"} />
      </div>
      <div className={"my-3 flex justify-between text-sm"}>
        <input className={"border rounded p-2 py-3 w-full"}
               type="text"
               placeholder={"Email"} />
      </div>
      <div className={"my-3 flex justify-between text-sm"}>
        <input className={"border rounded p-2 py-3 w-[49%]"}
               type="text"
               placeholder={"Phone"} />

        <input className={"border rounded p-2 py-3 w-[49%]"}
               type="text"
               placeholder={"City"} />
      </div>
      <div className={"my-3 flex justify-between text-sm"}>
        <input className={"border rounded p-2 py-3 w-full"}
               type="text"
               placeholder={"Password"} />
      </div>
    </div>
  )
}