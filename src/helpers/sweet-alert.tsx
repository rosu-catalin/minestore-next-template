import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

export const sweetAlert = (message: string) => {
   MySwal.fire(({
      title: message,
      background: "black",
      color: "white",
   }))
}
