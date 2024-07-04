const memoForm=document.querySelector(".memo-form");
const inputTitle=memoForm.querySelector("#memo-title");
const inputContent=memoForm.querySelector("#memo-content");
const memoBoard=document.querySelector("#memo-board");

let memos=[]
const savedMemos=localStorage.getItem("memos");

function loadMemos(){
    if(savedMemos!==null){
        memos=JSON.parse(savedMemos); //문자열 -> 객체
        memos.forEach(paintMemo);
    }
    
}

function onMemoDelete(event){
    const memoToDeleteHTML=event.target.closest(".memo"); //html
    console.log(memoToDeleteHTML);
    memoToDeleteHTML.remove(); //html remove
    
    memos=memos.filter(obj=>obj.id!=parseInt(memoToDeleteHTML.id));
    console.log(memos);
    saveMemo(memos);
}

function onMemoUpdate(event){
    const memoToUpdateHTML=event.target.closest(".memo");
    const memoToUpdateObj=memos.find(obj=>obj.id===parseInt(memoToUpdateHTML.id));

    const oldTitle=memoToUpdateObj.title;
    const oldContent=memoToUpdateObj.content;

    inputTitle.value=oldTitle; //input은 innerText가 아니라 value
    inputContent.value=oldContent;
    memoForm.id=memoToUpdateObj.id;
}

function paintMemo(memoObj){
    // console.log(memoObj);
    const memo=document.createElement("div");
    const memoTitle=document.createElement("h2");
    const memoContent=document.createElement("span");
    const btnContainer=document.createElement("div")
    const deleteBtn=document.createElement("button");
    const updateBtn=document.createElement("button");

    memo.id=memoObj.id;
    memoTitle.innerText=memoObj.title;
    memoContent.innerText=memoObj.content;
    deleteBtn.innerText="삭제";
    updateBtn.innerText="수정";

    memo.className="memo";
    memoTitle.className="memo-title";
    memoContent.className="memo-content";
    btnContainer.className="button-container";

    memo.appendChild(memoTitle);
    memo.appendChild(memoContent);
    btnContainer.appendChild(updateBtn);
    btnContainer.appendChild(deleteBtn);
    memo.appendChild(btnContainer);
    memoBoard.appendChild(memo);

    deleteBtn.addEventListener("click",onMemoDelete);
    updateBtn.addEventListener("click",onMemoUpdate);

}

function saveMemo(memos){
    localStorage.setItem("memos",JSON.stringify(memos)); //이거 안하면 [object, object] 이렇게 저장됨 객체->문자열

}

function onMemoSubmit(event){
    event.preventDefault(); //이거 안하면 바로 새로고침됨
    const newMemoTitle=memoForm.querySelector("#memo-title").value;
    const newMemoContent=memoForm.querySelector("#memo-content").value;
    if(memoForm.id){    //수정하는 경우
        const targetMemoObj=memos.find(obj=>obj.id===parseInt(memoForm.id)); //parseInt
        targetMemoObj.title=newMemoTitle;
        targetMemoObj.content=newMemoContent;
        saveMemo(memos);
        memoForm.id='';
        location.reload();
    }
    else{
        const newMemoId=Date.now();
        const newMemoObj={"id":newMemoId,"title":newMemoTitle,"content":newMemoContent}
        memos.push(newMemoObj);
        paintMemo(newMemoObj);
        saveMemo(memos);
        console.log(memoForm.id);
    }
    memoForm.reset();
    
}



loadMemos();
// console.log(memos);
memoForm.addEventListener("submit",onMemoSubmit);
