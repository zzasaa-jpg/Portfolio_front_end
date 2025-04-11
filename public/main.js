let list = document.getElementById("list");
let image_container = document.getElementById("image_container");
let arrow_forward = document.getElementById("arrow-forward");
let arrow_back = document.getElementById("arrow-back");
let body_of_square = document.getElementById("body_of_square");
let menu = document.getElementById("menu");
let project_info = document.getElementById("project_info");
let images_ = document.getElementById("images_");
let project_title = document.getElementById("project_title");
let responsive_container_parent = document.getElementById("responsive_container_parent");
let responsive_container = document.getElementById("responsive_container");
let responsive = document.getElementById("responsive");
let responsive_close = document.getElementById("responsive_close");
let links_btn = document.getElementById("links_btn");
let links_container = document.getElementById("links_container");
let container = document.getElementById("container");
let close_links_container = document.getElementById("close_links_container");
let single_responsive_image = document.getElementById("single_responsive_image");
let single_responsive_image_container = document.getElementById("single_responsive_image_container");
let arrow_back_single_responsive_image_container = document.querySelector(".arrow-back");
let arrow_forward_single_responsive_image_container = document.querySelector(".arrow-forward");
let responsive_Single_View = document.getElementById("responsive_Single_View");
let single_responsive_image_container_close = document.getElementById("single_responsive_image_container_close");
let responsive_Multiple_View = document.getElementById("responsive_Multiple_View");
//-------------project change btns -------------------------------------
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let arr = [];
let responsive_arr = [];
let list_value = false;
let single_responsive_image_arr = [];
let single_responsive_image_count = 0;

document.addEventListener("DOMContentLoaded", function () {
    async function rendering_the_projects() {
        list.addEventListener("click", function () {
            list_value = !list_value;
            if (list_value) {
                container.style.display = "flex";
                project_title.style.display = "flex";
            } else {
                container.style.display = "none";
                project_title.style.display = "none";
            }
        });

        links_btn.addEventListener("click", function () {
            links_container.style.display = "flex";
        })
        close_links_container.addEventListener("click", function () {
            links_container.style.display = "none";
        });
        loader(true);
        const response = await fetch("/projects");
        console.log(response.status);
        if (response.ok) {
            const data = await response.json();
            if (data.length == 0) {
                let src = "./images/Data is Zero!.png";
                image_container.src = src;
                console.log("zero");
                loader(false);
                list.style.backgroundColor = "rgba(0, 0, 0, 0.534)";
                return;
            }
            loader(false);
            console.log(data);
            
            const handleMediaQueryChange = (mediaQuery, mediaQuery1) => {
                let fieldnameToUse;
                if (mediaQuery.matches) {
                    fieldnameToUse = "images-mobile";
                    responsive_arr = [];
                } else if (mediaQuery1.matches) {
                    fieldnameToUse = "images-tab";
                    responsive_arr = [];
                } else {
                    fieldnameToUse = "images-loptop";
                    responsive_arr = [];
                }

                //----------------------------------------------------------------------------
                arr = [] // arr empty for resize the screen than image correctly push---------
                body_of_square.innerHTML = '';

                let project_count = 0;

                console.log(project_count);
                previous.addEventListener("click", function () {
                    project_count = (project_count - 1) % data.length;
                    if (project_count == -1) {
                        project_count = data.length - 1;
                    }
                    console.log(project_count);
                    responsive_arr = [];
                    arr = [];
                    project_count = 0
                    project_move();
                })
                next.addEventListener("click", function () {
                    arr = [];
                    project_count = 0
                    project_count = (project_count + 1) % data.length;
                    console.log(project_count);
                    responsive_arr = [];
                    project_move();
                })

                function project_move() {
                    arr = []; // Clearing the previous data----------------------------------------
                    body_of_square.innerHTML = '';// Clearing the previous data----------------------------------------
                    project_info.style.backgroundColor = ""; //clearing the previous background color------------------
                    data.forEach((e, index) => {
                        if (index == project_count) {//project changeing via project_count-----------------------------
                            e = data[project_count];
                            project_title.innerText = `${e.title}`;
                            project_info.innerHTML = ` 
                                            <h1 id="Project_details_h1">Project_details</h1>
                                            <p id="description">Description: ${e.description}</p>
                                            <h1 id="github_link"><a href="${e.github}" target="_blank" rel="noopener noreferrer">Github Link</a></h1>
                                            <a id="web_link" href="${e.weblink}" target="_blank" rel="noopener noreferrer">Go to Web</a>
                                            <p id="tech">Technologies: ${e.technologies}</p>
                                            <p id="last_update">Lastupdate: ${e.lastupdate}</p>
                                            <img src="./images/close-outline.svg" alt="arrow-back" id="close" width=24 height=24>
                                            <div class="opacity_conatainer">
                                                <label for="opacity">opacity</label>
                                                <input type="range" name="opacity" min="0" max="1" value="0.5" class="opacity" step="0.01">
                                            </div>`;
                            //opacity changing for clearly see the project_info-------------------------------------------
                            let opacity = document.querySelector(".opacity");
                            opacity.addEventListener("input", function () {
                                project_info.style.backgroundColor = `rgba(0, 0, 0, ${opacity.value})`;
                            })

                            let close = document.getElementById("close");
                            close.addEventListener("click", function () {
                                project_info.style.transform = "translatey(-2000vw)";
                                project_info.style.transition = "All";
                                project_info.style.transitionDuration = "0.5s";
                                list.style.display = "flex";
                            });
                            // description height adujement from (e.description.length)-----------------------------------
                            let description = document.getElementById("description");
                            if (e.description.length >= 1000) {
                                description.style.height = "60vh";
                                description.style.overflow = "hidden";
                                description.style.overflowY = "scroll";
                                description.style.cursor = "grab";
                            }

                            // data inside files object pushing inside of arr(ARRAY)------------------------------------- 
                            for (const ee in e.files) {
                                if (Object.prototype.hasOwnProperty.call(e.files, ee)) {
                                    const element = e.files[ee];
                                    element.forEach(files => {
                                        if (files.fieldname == fieldnameToUse) {
                                            arr.push(files.buffer);
                                        }
                                        //-------------responsive container inside render the images from responsive_arr(ARRAY)---------------
                                        if (files.fieldname == "images-loptop") {
                                            responsive_arr.push(files.buffer);
                                            responsive_container_function(responsive_arr, 0);
                                        }
                                        if (files.fieldname == "images-tab") {
                                            responsive_arr.push(files.buffer);
                                            responsive_container_function(responsive_arr, 0);
                                        }
                                        if (files.fieldname == "images-mobile") {
                                            responsive_arr.push(files.buffer);
                                            responsive_container_function(responsive_arr, 0);
                                        }
                                    });
                                }
                            }
                        }
                    });

                    console.log(arr);

                    images_.innerHTML = `<h1 id="images_">${(arr.length - 1) + 1}</h1>`;
                    let count = 0;
                    let squares = [];
                    image_container.src = `data:image/png;base64,${arr[count]}`;

                    for (let index = 0; index < arr.length; index++) {
                        body_of_square.innerHTML += `<div class="square"></div>`;
                        body_of_square.style.width = "auto";
                    }
                    squares = document.querySelectorAll(".square");
                    arrow_forward.addEventListener("click", function () {
                        if (count == count) {
                            image_container.style.transform = 'translateX(-250vh)';
                        }
                        count = (count + 1) % arr.length;
                        setTimeout(() => {
                            image_container.src = `data:image/png;base64,${arr[count]}`
                            image_container.style.transform = 'translateX(0px)';
                            currentSquares()
                        }, 1000);
                    });

                    arrow_back.addEventListener("click", function () {
                        if (count == count) {
                            image_container.style.transform = 'translateX(-250vh)';
                        }
                        count = (count - 1) % arr.length;
                        if (count == -1) {
                            count = arr.length - 1;
                        }
                        console.log(count);

                        setTimeout(() => {
                            image_container.src = `data:image/png;base64,${arr[count]}`
                            image_container.style.transform = 'translateX(0px)';
                            currentSquares()
                        }, 1000)
                    });

                    function currentSquares() {
                        squares.forEach((square, index) => {
                            if (index == count) {
                                square.style.backgroundColor = "white";
                            } else {
                                square.style.backgroundColor = "rgba(0, 0, 0, 0.507)";
                            }
                            square.addEventListener("click", function () {
                                count = index;
                                image_container.style.transform = 'translateX(-250vh)';
                                setTimeout(() => {
                                    image_container.src = `data:image/png;base64,${arr[count]}`
                                    image_container.style.transform = 'translateX(0px)';
                                    currentSquares()
                                }, 1000);
                            })
                        })
                    }
                    currentSquares();

                    menu.addEventListener("click", function () {
                        project_info.style.transform = "translatey(0px)";
                        project_info.style.transition = "All";
                        project_info.style.transitionDuration = "0.5s";
                        list.style.display = "none";
                    });
                }
                project_move();

                // responsive container hide & show. appending the images--------------------------
                responsive.addEventListener("click", function () {
                    responsive_container_parent.style.display = "flex";
                    responsive_close.style.display = "flex";
                    responsive_Single_View.style.display = "flex";
                    responsive_container_function(responsive_arr, 0);
                });

                //------ responsive container hide ----------------------------------------
                responsive_close.addEventListener("click", function () {
                    [responsive_container_parent, responsive_close, responsive_Single_View].forEach(element => {
                        element.style.display = "none";
                    });
                });

                //------ responsive single view show --------------------------------------
                responsive_Single_View.addEventListener("click", function () {
                    [single_responsive_image_container, single_responsive_image_container_close, responsive_Multiple_View].forEach(element => {
                        element.style.display = "flex";
                    });
                    responsive_container_parent.style.display = "none";
                });

                //------ responsive single view and responsive container hide -------------
                single_responsive_image_container_close.addEventListener("click", function () {
                    [single_responsive_image_container, responsive_container_parent, single_responsive_image_container_close, responsive_Multiple_View, responsive_close, responsive_Single_View].forEach(element => {
                        element.style.display = "none";
                    });
                });

                //------ responsive single view hide --------------------------------------
                responsive_Multiple_View.addEventListener("click", function () {
                    [single_responsive_image_container, single_responsive_image_container_close, responsive_Multiple_View].forEach(element => {
                        element.style.display = "none";
                    });
                    responsive_container_parent.style.display = "flex";
                });
            }

            // MediaOuery for images on device screen size-----------------------------------------------
            const mediaQuery = window.matchMedia("(max-width: 640px)");
            const mediaQuery1 = window.matchMedia("(max-width: 900px)");
            handleMediaQueryChange(mediaQuery, mediaQuery1);

            // Listen for changes to the media queries---------------------------------------------------
            mediaQuery.addEventListener("change", () => handleMediaQueryChange(mediaQuery, mediaQuery1));
            mediaQuery1.addEventListener("change", () => handleMediaQueryChange(mediaQuery, mediaQuery1));
        } else {
            console.log("data fetching error!")
        }

    }
    rendering_the_projects()//calling the rendering_the_projects() function------------------------------------------------------------------------
    function loader(value) {
        let loader_wrapper = document.getElementById("loader_wrapper");
        if (value) {
            loader_wrapper.style.display = "flex";
        } else {
            loader_wrapper.style.display = "none";
        }
    }
});
//-----------------------copy event disabled---------------------------------
window.addEventListener("copy", async function () {
    try {
        let selectedText = window.getSelection().toString();
        if (!selectedText) return;
        await navigator.clipboard.writeText("");
    } catch (err) {
        console.error("Failed to copy:", err);
    }
});
//---------------------------------------------------------------------------

//------------------------------------------- responsive_container_function -------------------------------------------------
function responsive_container_function(responsive_arr, single_responsive_image_count) {
    single_responsive_image_arr = [];
    responsive_container.innerHTML = "";
    for (let index = 0; index < responsive_arr.length; index++) {
        const element = responsive_arr[index];
        single_responsive_image_arr.push(element);
        const div_img = document.createElement("div");
        div_img.addEventListener("click", function () {
            single_responsive_image_container_function(single_responsive_image_arr, index);
            [single_responsive_image_container, single_responsive_image_container_close, responsive_Multiple_View].forEach(element => {
                element.style.display = "flex";
            });
            responsive_container_parent.style.display = "none";
        })
        const img = document.createElement("img");
        div_img.style.backgroundColor = "transparent"
        div_img.style.border = "1px solid white";
        div_img.className = "divImg";
        img.className = "responsive_show_images";
        img.style.objectFit = "contain";
        img.src = `data:image/png;base64,${element}`;
        div_img.appendChild(img);
        responsive_container.appendChild(div_img);
        responsive_container_parent.appendChild(responsive_container);
    }
    single_responsive_image_container_function(single_responsive_image_arr, single_responsive_image_count);
}
//---------------------------------------------------------------------------------------------------------------------------

//-------------------------------- single_responsive_image_container ----------------------------------------------------
function single_responsive_image_container_function(single_responsive_image_arr, single_responsive_image_count) {
    single_responsive_image.src = `data:image/png;base64,${single_responsive_image_arr[single_responsive_image_count]}`;

    arrow_back_single_responsive_image_container.addEventListener("click", function () {
        single_responsive_image_count = (single_responsive_image_count - 1) % single_responsive_image_arr.length;
        if (single_responsive_image_count == -1) {
            single_responsive_image_count = single_responsive_image_arr.length - 1;
        }
        single_responsive_image.src = `data:image/png;base64,${single_responsive_image_arr[single_responsive_image_count]}`;
    });

    arrow_forward_single_responsive_image_container.addEventListener("click", function () {
        single_responsive_image_count = (single_responsive_image_count + 1) % single_responsive_image_arr.length;
        single_responsive_image.src = `data:image/png;base64,${single_responsive_image_arr[single_responsive_image_count]}`;
    });
}
//-----------------------------------------------------------------------------------------------------------------------