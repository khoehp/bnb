import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import authReducer from "./../features/authentication/authSlice";
import adminReducer from "./../features/admin/adminSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer, 
});

const logger=(state)=>{
  return (next)=>{
      return (action)=>{
          //xử lý action 
          const actionList=localStorage.getItem("actionList");
          if(!actionList){
              localStorage.setItem("actionList",JSON.stringify([action]));
          }else{
              const actionListArr=JSON.parse(actionList);
              actionListArr.push(action);
              localStorage.setItem("actionList",JSON.stringify(actionListArr))
          }
          next(action);
      }
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer, 
  composeEnhancers(applyMiddleware(thunk,logger))
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
)
export default store;
