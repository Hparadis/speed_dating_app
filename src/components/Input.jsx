const Input = ({
    placeholder,
    type="text",
    value,
    onChange
    })=>{
    
    return(
    
    <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    
    className="
    w-full
    bg-[#111]
    border
    border-gray-700
    rounded-xl
    px-4
    py-3
    text-white
    outline-none
    mb-4
    transition-all
    focus:border-gray-400
    "
    />
    
    );
    
    };
    
    export default Input;