import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="blog-header">
        <h3>Ledger Blog</h3>
        <h2>Welcome to our blog</h2>
        <p>
          You can find here all Posts with comments under on. Also you can check
          the todo list, complete tasks and delete the ones that you want to to.
          Last but not least, you can enjoy watching albums! Enjoy our Blog!
        </p>
      </div>
      <div className="blogs">
        <div className="blog">
        <div className="blog-top">
        <img src="/assets/images/posts.jpg" alt=""/>
                        <span className="blog-category">Posts</span>
        </div>
            <div className="blog-about">
            <h4>See our Posts</h4>
            <p>Check out here posts and their comments. Feel yourself free to
              comment our posts.</p>
            <Link className="see-more" to="/Posts">
              Check it!
            </Link>
          </div>
        </div>
        <div className="blog">
        <div className="blog-top">
        <img src="/assets/images/albums.jpg" alt="" />
                        <span className="blog-category">Albums</span>
            </div>
            <div className="blog-about">
            <h4>Take a look on Albums</h4>
            <p>Check out here posts and their comments. Feel yourself free to
              comment our posts.</p>
            <Link className="see-more" to="/Posts">
              Check it!
            </Link>
          </div>
        </div>
        <div className="blog">
        <div className="blog-top">
        <img src="/assets/images/todo-list.jpg" alt=""/>
                        <span className="blog-category">Todo list</span>
            </div>
            <div className="blog-about">
            <h4>See the todo list</h4>
            <p>Check out here posts and their comments. Feel yourself free to
              comment our posts.</p>
            <Link className="see-more" to="/Posts">
              Check it!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
