function Newsletter() {
  return (
    <div className="flex flex-col justify-center items-center text-center space-y-2 my-32">
      <h2 className="md:text-4xl text-2xl font-semibold">Neves Miss a Blog!</h2>
      <p>Suscribe to get the latest blog, new tech, and exclusive news.</p>

      <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
        <input
          type="text"
          placeholder="Enter your email"
          required
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all 
        cursor-pointer rounded-md rounded-l-none"
        >
          Suscribe
        </button>
      </form>
    </div>
  )
}

export default Newsletter
