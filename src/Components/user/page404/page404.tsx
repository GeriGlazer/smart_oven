import "./page404.css";
import image404 from "../../../assets/page404.jpg"

function Page404(): JSX.Element {
    return (
        <div className="page404" >
            <h1 style={{color:"red"}}>Oooops! Something went wrong!</h1>
			<img width={700} src={image404} style={{marginLeft:200, marginTop:50}}></img>
            
        </div>
    );
}

export default Page404;
