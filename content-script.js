var storageVariables = [helper_obj.floatyoutube, helper_obj.floatyoutube_bannersize];

helper_startupfunction("youtube.com", function () {
	helper_getStorageVariablesFromSync(storageVariables, function (result) {
		floatYoutubeViewFunction(result);
	});
});

function floatYoutubeViewFunction(result) {
	if (result[helper_obj.floatyoutube]) {

		window.floatVideoInYoutube = function () {
			console.log("float video enabled");
			var closeBannerView = false;
			var videoWidth = "";
			var videoHeight = "";
			var videoTop = "";
			var videoLeft = "";
			document.checkingDateValue = new Date().toTimeString();

			window.scrollFunctionality = function (event) {

				if (closeBannerView) {
					return;
				}
				var vidplayer = document.getElementById("movie_player");
				if (vidplayer.getBoundingClientRect().width > 10 &&
					vidplayer.getBoundingClientRect().bottom < 1) {
					var bannerView = document.getElementById("bannerView");
					if (bannerView == null) {
						addBannerInTheYoutubePage();
					}
				}
				else {
					var bannerView = document.getElementById("bannerView");
					if (bannerView != null) {
						removedBannerAndBackToNormal();
					}
				}
			}

			window.resizeFunctionality = function (event) {
				if (videoWidth != "") {
					setTimeout(function () {
						var vid = document.getElementsByClassName("html5-main-video")[0];
						videoWidth = vid.style.width;
						videoHeight = vid.style.height;
						videoTop = vid.style.top;
						videoLeft = vid.style.left;
					}, 500);
				}
			}

			function addBannerInTheYoutubePage() {
				if (videoWidth !== "") return;

				let bannerHeight = result[helper_obj.floatyoutube_bannersize];
				if (bannerHeight < 50) bannerHeight = 50;

				const ytdWatch = document.getElementsByClassName("html5-video-player")[0];
				const vid = document.getElementsByClassName("html5-main-video")[0];
				const vidContainer = document.getElementsByClassName("html5-video-container")[0];
				const moviPlayerContainer = document.getElementById("movie_player");

				// Backup original styles
				videoWidth = vid.style.width;
				videoHeight = vid.style.height;
				videoTop = vid.style.top;
				videoLeft = vid.style.left;

				const normalWidth = parseInt(vid.style.width || "640");
				const normalHeight = parseInt(vid.style.height || "350");
				const vHeight = bannerHeight - 3;
				const vWidth = (normalWidth / normalHeight) * vHeight;

				const bannerView = document.createElement("div");
				bannerView.id = "bannerView";
				Object.assign(bannerView.style, {
					position: "fixed",
					left: "16px",
					top: "70px",
					width: vWidth + "px",
					height: bannerHeight + "px",
					backgroundColor: "#121212",
					boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
					borderRadius: "12px",
					overflow: "hidden",
					zIndex: 1000,
					transition: "opacity 0.3s ease-in-out",
					opacity: "0",
					cursor: "move"
				});
				setTimeout(() => bannerView.style.opacity = "1", 10);

				// Add drag functionality
				let isDragging = false;
				let currentX;
				let currentY;
				let initialX;
				let initialY;
				let xOffset = 16; // Initial left position
				let yOffset = 70; // Initial top position

				bannerView.addEventListener("mousedown", dragStart);
				document.addEventListener("mousemove", drag);
				document.addEventListener("mouseup", dragEnd);

				function dragStart(e) {
					if (e.target === playPauseBtn || e.target === closeButton) return;

					initialX = e.clientX - xOffset;
					initialY = e.clientY - yOffset;

					// Check if the click target is the banner or any of its children (except buttons)
					if (bannerView.contains(e.target)) {
						isDragging = true;
					}
				}

				function drag(e) {
					if (isDragging) {
						e.preventDefault();
						
						currentX = e.clientX - initialX;
						currentY = e.clientY - initialY;

						xOffset = currentX;
						yOffset = currentY;

						// Keep the banner within viewport bounds
						const maxX = window.innerWidth - bannerView.offsetWidth;
						const maxY = window.innerHeight - bannerView.offsetHeight;
						
						xOffset = Math.min(Math.max(0, xOffset), maxX);
						yOffset = Math.min(Math.max(0, yOffset), maxY);

						bannerView.style.left = xOffset + "px";
						bannerView.style.top = yOffset + "px";
					}
				}

				function dragEnd() {
					isDragging = false;
				}

				const videoWrapper = document.createElement("div");
				Object.assign(videoWrapper.style, {
					position: "relative",
					display: "inline-block",
					width: vWidth + "px",
					height: vHeight + "px"
				});

				Object.assign(vid.style, {
					width: vWidth + "px",
					height: vHeight + "px",
					position: "static"
				});
				videoWrapper.appendChild(vid);

				const controls = document.createElement("div");
				Object.assign(controls.style, {
					position: "absolute",
					top: "0",
					left: "0",
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					opacity: "0",
					transition: "opacity 0.2s ease",
					pointerEvents: "none"
				});

				videoWrapper.addEventListener("mouseenter", () => {
					controls.style.opacity = "1";
					controls.style.pointerEvents = "auto";
					updatePlayPauseIcon();
				});
				videoWrapper.addEventListener("mouseleave", () => {
					controls.style.opacity = "0";
					controls.style.pointerEvents = "none";
				});

				const svgPlay = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ccc" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
				const svgPause = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ccc" viewBox="0 0 24 24"><path d="M6 19h4V5H6zm8-14v14h4V5z"/></svg>`;
				const svgClose = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#aaa" viewBox="0 0 24 24"><path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.3 9.18 12 2.89 5.71 4.3 4.3l6.29 6.3 6.29-6.3z"/></svg>`;

				const playPauseBtn = document.createElement("button");
				playPauseBtn.innerHTML = svgPlay;
				Object.assign(playPauseBtn.style, {
					width: "48px",
					height: "48px",
					border: "none",
					borderRadius: "50%",
					backgroundColor: "rgba(30, 30, 30, 0.7)", 
					cursor: "pointer",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
					transition: "background-color 0.2s ease, color 0.2s ease"
				});
				playPauseBtn.onmouseenter = () => {
					playPauseBtn.style.backgroundColor = "#333";
					playPauseBtn.querySelector("svg").setAttribute("fill", "#fff");
				};
				playPauseBtn.onmouseleave = () => {
					playPauseBtn.style.backgroundColor = "rgba(30, 30, 30, 0.7)";
					playPauseBtn.querySelector("svg").setAttribute("fill", "#ccc");
				};
				playPauseBtn.onclick = () => {
					if (vid.paused) {
						vid.play();
					} else {
						vid.pause();
					}
					updatePlayPauseIcon();
				};
				function updatePlayPauseIcon() {
					playPauseBtn.innerHTML = vid.paused ? svgPlay : svgPause;
				}

				vid.addEventListener("play", updatePlayPauseIcon);
				vid.addEventListener("pause", updatePlayPauseIcon);

				const closeButton = document.createElement("button");
				closeButton.innerHTML = "×";
				Object.assign(closeButton.style, {
					position: "absolute",
					top: "8px",
					right: "8px",
					width: "30px",
					height: "30px",
					border: "none",
					borderRadius: "50%",
					backgroundColor: "rgba(30, 30, 30, 0.7)", 
					color: "#fff",
					fontSize: "18px",
					cursor: "pointer",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					transition: "background-color 0.2s ease, color 0.2s ease"
				});;
				closeButton.onmouseenter = () => {
					closeButton.style.backgroundColor = "#333";
					closeButton.style.color = "#fff";
				};
				closeButton.onmouseleave = () => {
					closeButton.style.backgroundColor = "rgba(30, 30, 30, 0.7)";
					closeButton.style.color = "#fff";
				};
				closeButton.onclick = () => {
					closeBannerView = true;
					removedBannerAndBackToNormal();
				};

				controls.appendChild(playPauseBtn);
				controls.appendChild(closeButton);
				videoWrapper.appendChild(controls);

				bannerView.appendChild(videoWrapper);
				ytdWatch.insertBefore(bannerView, ytdWatch.firstChild);

				vidContainer.style.zIndex = 3000;
				moviPlayerContainer.style.zIndex = 3000;
				document.getElementById("player").style.zIndex = 400;
			}


			function removedBannerAndBackToNormal() {
				const bannerView = document.getElementById("bannerView");
				const vid = document.getElementsByClassName("html5-main-video")[0];

				if (videoWidth !== "") {
					// Restore video styles
					vid.style.width = videoWidth;
					vid.style.height = videoHeight;
					vid.style.top = videoTop;
					vid.style.left = videoLeft;
					vid.style.position = "";

					// Move video back to original container before removing banner
					const originalContainer = document.getElementsByClassName("html5-video-container")[0];
					originalContainer.appendChild(vid);

					videoWidth = "";
					videoHeight = "";
					videoTop = "";
					videoLeft = "";

					originalContainer.style.zIndex = "";
					document.getElementById("movie_player").style.zIndex = "";
					document.getElementById("player").style.zIndex = "";
				}

				if (bannerView) {
					bannerView.remove();
				}
			}


			var oldURL = window.location.href;
			window.clearTimeoutForUrlChange;
			window.checkURLchange = function (currentURL) {
				if (currentURL != oldURL) {
					removeAllListenersAndReload();
					oldURL = currentURL;
				}
				else {
					clearTimeoutForUrlChange = setTimeout(function () {
						checkURLchange(window.location.href);
					}, 1000);
				}
			}

			function removeAllListenersAndReload() {
				clearTimeout(window.clearTimeoutForUrlChange);
				removedBannerAndBackToNormal();
				window.removeEventListener("scroll", scrollFunctionality);
				window.removeEventListener("resize", resizeFunctionality);
				setTimeout(function () {
					floatVideoInYoutube();
				}, 1000);
			}
			window.checkURLchange(oldURL);

			window.addEventListener("scroll", scrollFunctionality);
			window.addEventListener("resize", resizeFunctionality);

			return true;
		}

		tryAgainWithTimeout(5, 500, floatVideoInYoutube);
	}
}
