const Form = () => {
    return (
        <form action="/my-handling-form-page" method="post">
            <ul>
                <li>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="user_name"/>
                </li>
                <li>
                    <label htmlFor="mail">E-mail:</label>
                    <input type="email" id="mail" name="user_email"/>
                </li>
            </ul>
        </form>
    )
}

export default Form;