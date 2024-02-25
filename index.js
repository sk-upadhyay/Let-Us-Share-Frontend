const drophere = document.querySelector(".drop")
const fileInput = document.querySelector(".Dropfile")
const browse = document.querySelector(".upload")
const host = "http://localhost:3000/"
const uplaodUrl = `${host}api/files`;
const bgProgress= document.querySelector(".bg-progress");
const percentprogress= document.querySelector(".percent")
const progressbar = document.querySelector('.progress-bar');
const progresscontainer = document.querySelector('.progress-container');
const sharingcontainer = document.querySelector('.sharing-container');
const inputfield = document.querySelector('.fileURL')
const copybtn = document.querySelector('#copy-btn');

drophere.addEventListener("dragover", (e)=>{
    e.preventDefault()

    if(!drophere.classList.contains("dragged")){
        drophere.classList.add("dragged");
    }
});

drophere.addEventListener("dragleave",()=>{
    drophere.classList.remove("dragged")
})

drophere.addEventListener("drop",(e)=>{
    e.preventDefault()
    drophere.classList.remove("dragged")
    const files = e.dataTransfer.files;
    console.table(files);
    if(files.length){
        fileInput.files=files;
        uplaodFile()
    }
});

browse.addEventListener("click",()=>{
    fileInput.click()
});
fileInput.addEventListener("change",()=>{
    uplaodFile()
});

const uplaodFile=()=>{
    progresscontainer.style.display = 'block';
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("myfile",file);

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange=()=>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            console.log(xhr.response)
            fileLink(JSON.parse(xhr.response))
        }
    };
    xhr.upload.onprogress = updateProgress;

    xhr.open("POST",uplaodUrl)
    xhr.send(formData)
};

const updateProgress = (e) => {
    const percent = (e.loaded / e.total) * 100;
    // console.log(percent);
    bgProgress.style.transform = `scaleX(${percent / 100})`;
    percentprogress.innerText = Math.round(percent);
    progressbar.style.transform = `scaleX(${percent / 100})`;
};

const fileLink =({file})=>{
    console.log(file);
    progresscontainer.style.display = 'none';
    sharingcontainer.style.display ='block';
    inputfield.value =file;
    
}

copybtn.addEventListener('click',()=>{
    inputfield.select()
    document.execCommand('copy')
});

// sharingcontainer.style.display ='block';


