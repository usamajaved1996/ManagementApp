import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const OverviewModal = ({ visible, onClose }) => {
    return (
        <Modal transparent animationType="slide" visible={visible}>
            <View style={styles.modalOverlay}>
                <View style={styles.bottomModal}>
                    {/* Gradient Header */}
                    <LinearGradient
                        colors={['#2F5E41', '#2B2B95']}
                        style={styles.gradientHeader}
                        start={{ x: 1, y: 1 }}
                        end={{ x: 0, y: 1 }}
                    >
                        <Text style={styles.headerTitle}>Overview</Text>
                    </LinearGradient>

                    {/* Content */}
                    <View style={styles.content}>
                        {[
                            { label: 'Total Product', value: '15226' },
                            { label: 'Total Sell', value: '5241' },
                            { label: 'Yesterday Sell', value: '6241' },
                            { label: 'Total Sell', value: '15226' },
                            { label: 'Product Reserved', value: '15226' },
                            { label: 'Stock Issues', value: '15226' },
                        ].map((item, index) => (
                            <View key={index} style={styles.row}>
                                <Text style={styles.label}>{item.label}</Text>
                                <Text style={styles.value}>{item.value}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Close Button */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    bottomModal: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: 'hidden',
        width: '100%',
    },
    gradientHeader: {
        padding: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#fff',
    },
    content: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#D0D0D0',
        paddingVertical: 22,
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
        color: '#4C4C4C',
    },
    value: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
    },
    closeButton: {
        marginTop: 14,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2B2B95',
    },
    closeButtonText: {
        color: '#2B2B95',
        fontSize: 16,
        fontWeight: '400',
    },
});

export default OverviewModal;
