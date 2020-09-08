const checkRole = function(m){
    return m.member.roles.cache.some(role => role.name === 'king');
}

module.exports = checkRole;