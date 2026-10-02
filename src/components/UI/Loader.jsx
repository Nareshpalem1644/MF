export default function Loader({ text = "Syncing with live servers..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-dark-800"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-sm font-semibold tracking-wide text-dark-400 mt-1">{text}</p>
    </div>
  )
}
