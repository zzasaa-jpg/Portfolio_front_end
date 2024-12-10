let list = document.getElementById("list");
let project_section_h1 = document.getElementById("project_section_h1");
let image_container = document.getElementById("image_container");
let arrow_forward = document.getElementById("arrow-forward");
let arrow_back = document.getElementById("arrow-back");
let body_of_square = document.getElementById("body_of_square");
let menu = document.getElementById("menu");
let image = document.getElementById("image");
let project_info = document.getElementById("project_info");
let images_ = document.getElementById("images_");
let project_title = document.getElementById("project_title");
let responsive_container_parent = document.getElementById("responsive_container_parent");
let responsive_container = document.getElementById("responsive_container");
let responsive = document.getElementById("responsive");
let responsive_close = document.getElementById("responsive_close");
let links_btn = document.getElementById("links_btn");
let links_container = document.getElementById("links_container");
//-------------project change btns -------------------------------------
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let arr = [];
let responsive_arr = [];
let list_value = false;
let links = false;

document.addEventListener("DOMContentLoaded", function () {
    async function a() {
        // loader(true);
        list.addEventListener("click", function () {
            list_value = !list_value;
            if (list_value) {
                arrow_forward.style.display = "flex";
                arrow_back.style.display = "flex";
                menu.style.display = "flex";
                image.style.display = "flex";
                previous.style.display = "flex";
                next.style.display = "flex";
                project_section_h1.style.display = "flex";
                project_title.style.display = "flex";
                responsive.style.display = "flex";
                links_btn.style.display = "flex";
            } else {
                arrow_forward.style.display = "none";
                arrow_back.style.display = "none";
                menu.style.display = "none";
                image.style.display = "none";
                previous.style.display = "none";
                next.style.display = "none";
                project_section_h1.style.display = "none";
                project_title.style.display = "none";
                responsive.style.display = "none";
                links_btn.style.display = "none";
            }
        });

        links_btn.addEventListener("click", function () {
            links = !links
            if (links) {
                links_container.style.transform = "translateY(0px)";
            } else {
                links_container.style.transform = "translateY(600px)";
            }
        })
        loader(true);
        const response = await fetch(`https://portfolio-back-end-q8gv.onrender.com/projects`);
        console.log(response.status);
        if (response.ok) {
            const data = await response.json();
            if (data.length == 0) {
                let src = "./images/data.png";
                image_container.src = src
                console.log("zero");
                loader(false);
                return
            }
            loader(false);
            console.log(data);

            const handleMediaQueryChange = (mediaQuery, mediaQuery1) => {
                let fieldnameToUse;
                if (mediaQuery.matches) {
                    fieldnameToUse = "images-tab";
                    responsive_arr = [];
                } else if (mediaQuery1.matches) {
                    fieldnameToUse = "videos-loptop";
                    responsive_arr = [];
                } else {
                    fieldnameToUse = "images-loptop";
                    responsive_arr = [];
                }

                //----------------------------------------------------------------------------
                arr = [] // arr empty for resize the screen than image correctly push---------
                body_of_square.innerHTML = '';

                let project_count = 0;

                console.log(project_count)
                previous.addEventListener("click", function () {
                    project_count = (project_count - 1) % data.length;
                    if (project_count == -1) {
                        project_count = data.length - 1;
                    }
                    console.log(project_count)
                    responsive_arr = [];
                    project_move()
                })
                next.addEventListener("click", function () {
                    project_count = (project_count + 1) % data.length;
                    console.log(project_count)
                    responsive_arr = [];
                    project_move()
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
                                                <h1 id="github_link"><a href="${e.github}" target="_blank" rel="noopener noreferrer">Github LINK</a></h1>
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
                                console.log(opacity.value);
                                project_info.style.backgroundColor = `rgba(0, 0, 0, ${opacity.value})`;
                            })


                            let close = document.getElementById("close");
                            close.addEventListener("click", function () {
                                project_info.style.transform = "translatey(-2000px)";
                                project_info.style.transition = "All";
                                project_info.style.transitionDuration = "0.5s";
                                menu.style.display = "flex";
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
                                            responsive_arr.push(files.buffer)
                                        }
                                        if (files.fieldname == "videos-loptop") {
                                            responsive_arr.push(files.buffer)
                                        }
                                        if (files.fieldname == "images-tab") {
                                            responsive_arr.push(files.buffer)
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
                    image_container.src = `data:image/png;base64,${arr[count]}`

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
                                square.style.backgroundColor = "rgba(0, 0, 0, 0.507)";
                            } else {
                                square.style.backgroundColor = "white";
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
                        menu.style.display = "none";
                        list.style.display = "none";
                        links_container.style.transform = "translateY(600px)";
                        links = false;
                    });
                }
                project_move()

                // responsive container hide & show. appending the images--------------------------
                responsive.addEventListener("click", function () {
                    responsive_container_parent.style.display = "flex";
                    responsive_close.style.display = "flex";
                    links_container.style.transform = "translateY(600px)";
                    links = false;
                    responsive_container.innerHTML = "";
                    for (let index = 0; index < responsive_arr.length; index++) {
                        const element = responsive_arr[index];
                        const div_img = document.createElement("div");
                        const img = document.createElement("img");
                        // div_img.style.width = "100px";
                        // div_img.style.height = "100px";
                        div_img.style.backgroundColor = "transparent"
                        div_img.style.border = "1px solid white";
                        div_img.className = "divImg";
                        img.className = "responsive_show_images";
                        img.style.objectFit = "contain";
                        // img.style.width = "100px";
                        // img.style.height = "100px";
                        img.src = `data:image/png;base64,${element}`;
                        div_img.appendChild(img);
                        responsive_container.appendChild(div_img);
                        responsive_container_parent.appendChild(responsive_container);
                    }
                })

                //------responsive container hide--------------------------------------
                responsive_close.addEventListener("click", function () {
                    responsive_container_parent.style.display = "none";
                    responsive_close.style.display = "none";
                })
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
    a()//calling the a() function------------------------------------------------------------------------
    function loader(value) {
        let loader_wrapper = document.getElementById("loader_wrapper");
        if (value) {
            loader_wrapper.style.display = "flex";
        } else {
            loader_wrapper.style.display = "none";
        }
    }
});