
const Footer = () => {
  return (
    <div className="container mx-auto flex flex-col md:flex-row items-center bg-orange-500 text-white py-7 justify-between">
      <div className="text-2xl font-bold tracking-tight">MernEats.com</div>
      <div className="flex gap-5 text-sm">
        <span className="tracking-tight">Privacy Policy</span>
        <span className="tracking-tight">Terms of Service</span>
      </div>
    </div>
  )
}

export default Footer
