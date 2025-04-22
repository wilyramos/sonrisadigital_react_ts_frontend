import { toast } from 'sonner'
import Header from '../components/Home/Header'

export default function home() {


    const funcionSonner = () => {
        toast.success('This is a success message!')

      

    }


    return (

        <>
            <button 
                className="btn btn-primary cursor-pointer"
                onClick={funcionSonner}                
            >test sonner</button>
            <Header />
        </>
    )
}
