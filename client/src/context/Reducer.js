const Reducer = (state,action) =>{
    switch(action.type){
        case "LOGIN START":return{
            user:null,
            isFetching:true,
            error:false
        };
        case "LOGIN SUCCESS":return{
            user:action.payload,
            isFetching:false,
            error:false
        };
        case "LOGIN FAIL":return{
            user:null,
            isFetching:false,
            error:action.payload
        };
        default:{
            return state
        }
    }
}

export default Reducer;