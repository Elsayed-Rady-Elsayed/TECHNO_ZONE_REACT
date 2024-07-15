export default function Alert(props) {
  return (
    <div className={`w-full ${props.color} text-white p-2`}>{props.title}</div>
  );
}
