import { useEffect, useState } from "react"
import data from "../database/data"
import { useDispatch } from "react-redux"

// redux actions
import * as Action from '../redux/question_reducer'



// fetch question hook
export default function useFetchQuestion(){
    const dispatch = useDispatch();
  
    const [getData, setGetData] = useState({Loading : false, apiData: [], serverError : null})
useEffect (()=>{
    setGetData(prev =>({...prev,Loading: true}));


    // async function to fetch backend data

    (async()=>{
        try {
            let question = await data

            if(question.length > 0){
                setGetData(prev =>({...prev,Loading: false}));
                setGetData(prev =>({...prev,apiData: question}));
      
                //    dispatch action
                dispatch(Action.startExamAction(question))
            }
            else{
                throw new Error ("No Question Available")
            }
        } catch (error) {
            setGetData(prev =>({...prev,Loading: false}));
            setGetData(prev =>({...prev,serverError: error}));
        }
    })();




}, [dispatch]);
return [getData,setGetData];
}

export const MoveNextQuestion = () =>{
    try {
        
    } catch (error) {
        console.log(error)
    }
}