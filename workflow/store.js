export default Charity => data => {
    const charity = Charity.build(data.parsed);
    return charity.save().then(saved => ({ ...data, saved }));
}