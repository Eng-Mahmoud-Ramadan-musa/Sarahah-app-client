/* eslint-disable react/prop-types */

export default function ErrorMessage({err}) {
  return (
    <div className="absolute top-[10%] text-red-500">
      <p>🚨 Error:{err}</p>
    </div>
  )
}
