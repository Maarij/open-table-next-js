import Header from "@/app/components/Header";

export default function Loading() {
  return (
    <main>
      <Header />
      <div className={'py-3 px-36 -10 flex flex-wrap justify-center'}>
        {[1,3,4,5,6,7,8,9,10,11,12].map(num => (
          <div key={num} className={"animate-pulse bg-slate-200 w-64 h-73 m-3 rounded overflow-hidden border cursor-pointer"} />
        ))}
      </div>
    </main>
  )
}