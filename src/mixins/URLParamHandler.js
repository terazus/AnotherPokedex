export default {
    methods: {
        /**
         * Given a field name and a value, set the corresponding URL parameter and pushes it to the router
         * @param fieldName
         * @param fieldValue
         * @returns {Promise<void>}
         */
        async setURLParameters(fieldName, fieldValue) {
            const query = this.$route.query
            let newQuery = { ...query }
            if (fieldValue) newQuery[fieldName] = fieldValue
            else if (Object.keys(query).includes(fieldName)) delete newQuery[fieldName]
            await this.$router.push({ path: '/', query: newQuery })
        }
    }
}
