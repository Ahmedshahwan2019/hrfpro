let gitHubApi = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

/*
  Write here your JavaScript for HackYourRepo!
*/
function fetchData(url) {
    return fetch(url).then((response) => response.json());
}

function main() {
    const header = document.createElement('header');
    const title = document.createElement('h3');
    const selector = document.createElement('select');
    const selectorDiv = document.createElement('div');
    const container = document.createElement('main');
    const section = document.createElement('section');
    const repoName = document.createElement('div');
    const repoDescriptin = document.createElement('div');
    const repoForks = document.createElement('div');
    const repoUpdate = document.createElement('div');
    const contributor = document.createElement('section');
    const contributorTittle = document.createElement('h4');
    const contributorsDiv = document.createElement('div');
    const ulEl = document.createElement('ul');
    // header
    document.body.appendChild(header);
    header.setAttribute('id', 'top-container');
    header.appendChild(title);
    title.innerText = 'HRF Repositories:';
    title.setAttribute('class', 'title');
    header.appendChild(selectorDiv);
    selectorDiv.classList.add('option');
    selectorDiv.appendChild(selector);
    selector.innerHTML = `<option>--Choose a Repositroy --</option>`;
    selector.classList.add('chose');

    //repo info elements
    document.body.appendChild(container);
    container.setAttribute('class', 'display-container');
    container.appendChild(section);
    section.setAttribute('id', 'display');
    section.appendChild(repoName);
    repoName.setAttribute('class', 'repository-info');
    section.appendChild(repoDescriptin);
    repoDescriptin.setAttribute('class', 'description-info');
    section.appendChild(repoForks);
    repoForks.setAttribute('class', 'forks-info');
    section.appendChild(repoUpdate);
    repoUpdate.setAttribute('class', 'update-info');
    //contributor info elements
    container.appendChild(contributor);
    contributor.setAttribute('id', 'contributors');
    contributor.appendChild(contributorTittle);
    contributorTittle.innerText = 'contributors';
    contributorTittle.setAttribute('class', 'contributor-title');
    contributor.appendChild(contributorsDiv);
    contributorsDiv.appendChild(ulEl);
    ulEl.setAttribute('class', 'list');
    //pages
    function createPage(users) {
        const list = document.createElement('div');
        list.setAttribute('class', 'list');
        const pagination = document.createElement('div');
        list.setAttribute('class', 'pagenumbers');
        contributor.appendChild(list);
        contributor.appendChild(pagination);
        let currentPage = 1;
        let rows = 5;
        displayList(users, list, rows, currentPage);
        setUpPages(list, pagination, rows);
    }

    function displayList(items, wapper, rowPerPages, page) {
        wapper.innerHTML = '';
        page--;
        let start = rowPerPages * page;
        let end = start + rowPerPages;
        let paginatedItem = items.slice(start, end);
        for (let i = 0; i < paginatedItem.length; i++) {
            const items = paginatedItem[i];
            const ul = document.createElement('ul');
            ul.innerHTML = items;
            wapper.appendChild(ul);
        }
    }

    function setUpPages(items, wraper, rowPerPages) {
        wraper.innerHTML = '';
        let pageCount = Math.ceil(items.length / rowPerPages) + 1;
        for (let i = 0; i < pageCount; i++) {
            let btn = paginationbtn(i);
            wraper.appendChild(btn);
        }

        function paginationbtn(page) {
            let btn = document.createElement('button');
            btn.innerHTML = page;
            if (currentPage == page) btn.classList.add('active');
            return btn;
        }
    }
    // fetch data
    let option;
    fetchData(gitHubApi).then((data) => {
        data.forEach((repoName) => {
            option += `<option value='${repoName.name}'>${repoName.name}</option>`;
        });
        selector.innerHTML = option;
    });

    selector.addEventListener('change', getRepoInfo);

    function getRepoInfo(e) {
        let optionValue = e.target.value;
        fetchData(gitHubApi).then((data) => {
            data.forEach((option) => {
                let users = [];
                if (optionValue === option.name) {
                    repoName.innerHTML = `<b><span>Repository: </b></span><a href ="${option.html_url}">${option.name}</a>`;
                    repoDescriptin.innerHTML = `<p><b><span>description: </b></span>${option.description}</p>`;
                    repoForks.innerHTML = `<p><b><span>Fork: </b></span>${option.forks}</p>`;
                    repoUpdate.innerHTML = `<p><b><span>Update: </b></span>${option.updated_at}</p>`;
                    fetchData(option.contributors_url).then((contributors) => {
                        contributors.forEach((user) => {
                            const userImage = user.avatar_url;
                            const userGithubPage = user.html_url;
                            const userName = user.login;
                            const userContributuins = user.contributions;
                            // console.log(userContributuins);
                            users.push(
                                `<li class="user-list"> <img class="user-img" src ="${userImage}"> <a href="${userGithubPage}">${userName}</a> <p class="users">${userContributuins}</p></li>`,
                            );
                        });
                        createPage(users);
                    });
                }
            });
        });
    }
}
main();