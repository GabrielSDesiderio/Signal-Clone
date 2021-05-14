<ScrollView >
                            {messages.map(({ id, data }) => (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.reciever}>
                                        <Avatar source={{ uri: data.photoURL }} rounded size={30} position="absolute" bottom={-15} right={-5} />
                                        <Text style={styles.recieverText}>{data.message}</Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender}>
                                        <Avatar source={{ uri: data.photoURL }} rounded size={30} position="absolute" bottom={-15} left={-5} />
                                        <Text style={styles.senderText}>{data.message}</Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>