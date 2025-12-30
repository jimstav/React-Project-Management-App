interface InputProps {
  label: string;
  textarea?: boolean;
}

const Input = ({ label, textarea = false, ...props }: InputProps) => {
  return (
    <p>
      <label>{label}</label>
      {textarea ? <textarea {...props} /> : <input {...props} />}
    </p>
  );
};

export default Input;
