let element = {
    video_array: [...document.querySelector('video').children],
    video: document.querySelector('video'),
    btn_redo: document.querySelector('.step-forward'),
    btn_undo: document.querySelector('.step-back'),
    btn_velocity: document.querySelector('.btn-velocity'),
    toggle_autoplay: document.querySelector('.toggle-switch'),
    btn_resize: document.querySelector('.resize'),
    video_list: document.querySelector('.video-list'),
    velocity_container: document.querySelector('.velocity-container'),
    display_velocity: document.querySelector('.velocity-current'),
    input_velocity: document.querySelectorAll("input[name='velocity']"),
    container_1: document.querySelector('.container-1'),
    container_video: document.querySelector('.container-video'),
    container_list: document.querySelector('.container-video-list'),
    video_title: document.querySelector('.video-title'),
    autoplay_text: document.querySelector('.autoplay'),
    btn_backward: document.querySelector('.btn-backward'),
    btn_forward: document.querySelector('.btn-forward')
}

let video_dom_controler = {
    selected: 0,
    src_video: [],
    flag: false
};

let playlist = {
    media: [
        {
            title: 'Jason Derulo - Breathing',
            desription: '',
            duration: '',
        },
        {
            title: 'Ariana Grande - Love Me Harder (feat. The Weeknd)',
            desription: '',
            duration: '',
        },
        {
            title: 'Trey Songz - Chi Chi feat. Chris Brown [Official Music Video]',
            desription: '',
            duration: '',
        },
        {
            title: 'ILOVEMAKONNEN (FEAT. DRAKE) - TUESDAY',
            desription: '',
            duration: '',
        },
        {
            title: 'Tyga - For The Road (Official Music Video) (Explicit) ft. Chris Brown',
            desription: '',
            duration: '',
        },
        {
            title: 'Meek Mill - Going Bad feat. Drake (Official Video)',
            desription: '',
            duration: '',
        },
        {
            title: 'No New Friends (Explicit)',
            desription: '',
            duration: '',
        },
        {
            title: 'Kodak Black - ZEZE feat. Travis Scott & Offset [Official Music Video]',
            desription: '',
            duration: '',
        },
        {
            title: 'TRIPPIE REDD ft. 6IX9INE - POLES1469 (official music video)',
            desription: '',
            duration: '',
        },
        {
            title: 'French Montana - No Stylist ft. Drake (Official Music Video)',
            desription: '',
            duration: '',
        }
    ],
};

element.video_array.forEach(vid =>{
    video_dom_controler.src_video.push(vid.src);
 });

let total_video = element.video_array.reduce((total, next)=>{
    return total + 1;
}, 0);

element.video.addEventListener('durationchange', function() {
    //console.log('Duration change', element.video.duration);
});


function activate(index){
    element.video_list.children[index].classList.add('active-video-list');
    element.video_list.children[index].firstChild.classList.add('active-circle');
    element.video_title.innerHTML = playlist.media[index].title;
}


function VideoContainerLoad(){

    function render(){
        let str = '';
        for (let i = 0; i < playlist.media.length; i++){
             let list = document.createElement('li');
             let span = document.createElement('span');
             let text = document.createTextNode(playlist.media[i].title);
             list.appendChild(span);
             list.appendChild(text);
             element.video_list.appendChild(list);
        }  
    }

    function changeSource(url){
        var video = element.video;
        video.src = url;
        //video.play();
    }
    

    function checkedRadio(){
        element.input_velocity.forEach(cur => {
            cur.checked = false;
            if(cur.value == 1) cur.checked = true;
            console.log(cur.value)
        });
    }


    function init(){
        render();
        changeSource(video_dom_controler.src_video[0]);
        checkedRadio();
        activate(0);
    }

    return {
        init
    }
}

function getIndex(str){
    for(let i = 0; i < playlist.media.length; i++){
        if(str == playlist.media[i].title) return i;
    }
    return -1;
}

function changeSource(url){
    var video = element.video;
    video.src = url;
    video.play();
}

function removeAllActiveClass(){
    let arr = [...element.video_list.children];
    arr.forEach(cur => {
        cur.classList.remove('active-video-list');
        cur.firstChild.classList.remove('active-circle');
    });
}


function insertVelocity(arr){
    element.input_velocity.forEach(cur => arr.push(cur.value));
}

function containVelocity(arr, value){
    for (cur of arr){
        if(cur == value) return true;
    }
    return false;
}


element.toggle_autoplay.addEventListener('click', ()=>{
    if(element.toggle_autoplay.checked){
        video_dom_controler.flag = true;
        element.autoplay_text.style.color = 'greenyellow';
    } else{
        video_dom_controler.flag = false;
        element.autoplay_text.style.color = 'var(--grey-strong)';
    }
});

element.velocity_container.addEventListener('click', function(e){
    let event = e.target;
     let arrVelocity = [];
     insertVelocity(arrVelocity);
     if(containVelocity(arrVelocity, event.value)){
         element.video.playbackRate = event.value;
    }
    
});


 element.video.addEventListener('ended', ()=>{
    if(video_dom_controler.flag){
        removeAllActiveClass();
        if(video_dom_controler.selected + 1 < total_video) video_dom_controler.selected += 1;
        else video_dom_controler.selected = 0;
        changeSource(video_dom_controler.src_video[video_dom_controler.selected]);
        element.video_title.innerHTML = playlist.media[video_dom_controler.selected].title;
        activate(video_dom_controler.selected);
    }
});


element.btn_undo.addEventListener('click',()=>{
    element.video.currentTime -= 10;
});

element.btn_redo.addEventListener('click', ()=>{
    element.video.currentTime += 10;
});



element.video_list.addEventListener('click', (e)=>{
    let event = e.target;
    let index = getIndex(event.lastChild.textContent);
    if(index != -1){
        removeAllActiveClass();
        video_dom_controler.selected = index;
        event.classList.add('active-video-list');
        event.firstChild.classList.add('active-circle');
        element.video_title.innerHTML = playlist.media[index].title;
        changeSource(video_dom_controler.src_video[index]);
    }
});


window.addEventListener('load', (e)=>{
    const videoContainerLoad = VideoContainerLoad();
    videoContainerLoad.init();
});

element.btn_resize.addEventListener('click', ()=>{
    element.container_1.classList.toggle('resize-container-1');
    element.container_video.classList.toggle('resize-video');
    element.container_list.classList.toggle('resize-list');
});


element.btn_velocity.addEventListener('click', ()=>{
    element.velocity_container.classList.toggle('active');
});

element.btn_backward.addEventListener('click',()=>{
    removeAllActiveClass();
    if(video_dom_controler.selected - 1 > -1 ) video_dom_controler.selected -= 1;
    else video_dom_controler.selected = 0;
    changeSource(video_dom_controler.src_video[video_dom_controler.selected]);
    element.video_title.innerHTML = playlist.media[video_dom_controler.selected].title;
    activate(video_dom_controler.selected);
});

element.btn_forward.addEventListener('click',()=>{
    removeAllActiveClass();
    if(video_dom_controler.selected + 1 < total_video) video_dom_controler.selected += 1;
    else video_dom_controler.selected = 0;
    changeSource(video_dom_controler.src_video[video_dom_controler.selected]);
    element.video_title.innerHTML = playlist.media[video_dom_controler.selected].title;
    activate(video_dom_controler.selected);
});




