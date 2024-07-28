const Form = () => {
    return (
        <form action="/api/register" method="post">
            <ul>
                <li>
                    <input name="user_name"/>
                </li>
                <li>
                    <label htmlFor="mail">E-mail:</label>
                    <input name="user_email"/>
                </li>
                <button>确定</button>
            </ul>
        </form>
    )
}

export default Form;