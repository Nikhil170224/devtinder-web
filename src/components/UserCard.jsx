const UserCard = ({ user }) => {
    const { firstName, lastName, age, gender, photoUrl, about, skills } = user;
    return (
      <div className="flex justify-center my-10">
        <div className="card bg-base-100 w-96 shadow-sm">
          <figure>
            <img src={photoUrl} alt="profilePicture" />
          </figure>
          <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    {age && gender && <h3>{age + "years  " + gender} </h3>}
            <p>{about}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary">Ignore</button>
              <button className="btn btn-primary">Interested</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default UserCard;