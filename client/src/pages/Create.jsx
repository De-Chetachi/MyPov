

function Create() {

    return (
        <div className="">
            <div className="w-11/12 m-auto">
                <form action="">
                    <input className="font-lg text-4xl md:text-5xl text-black mt-8 capitalize py-6"
                        type="text"
                        name="title"
                        placeholder="title"
                        required
                        minLength={8}
                    />
                    <br />
                    <button className="font-bold text-5xl my-4">+</button>
                    <br />
                    <input className="font-lg py-4 my-1"
                        type="text"
                        name="text"
                        placeholder="tell your story"
                        required
                    />
                </form>
            </div>
        </div>
    )
}
export default Create;