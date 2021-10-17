import "./test-sign-up.scss";

const TestSignUp = () => {
  const handleSU = () => {};
  return (
    <form className="test-form" action="#">
      <h1>Create Account</h1>
      <div class="social-container">
        <a href="#" class="social">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="#" class="social">
          <i class="fab fa-google-plus-g"></i>
        </a>
        <a href="#" class="social">
          <i class="fab fa-linkedin-in"></i>
        </a>
      </div>
      <span>or use your email for registration</span>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button onClick={handleSU}>Sign Up</button>
    </form>
  );
};

export default TestSignUp;
