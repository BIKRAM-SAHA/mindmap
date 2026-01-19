interface Node {
	id: string;
	parentId: string | null;
}
type AdjacencyList = Record<string, string[]>;

const removeNode = (nodes: Node[], adjacencyList: AdjacencyList, nodeId: string) => {
	const nodeIdx = nodes.findIndex((node) => node.id === nodeId);
	if (nodeIdx === -1) {
		throw new Error("Invalid Node Selected");
	}
	const children = adjacencyList[nodeId];
	children.forEach((childNodeId) => {
		adjacencyList = removeNode(nodes, adjacencyList, childNodeId);
	});

	nodes.splice(nodeIdx, 1);
	adjacencyList = Object.fromEntries(
		Object.entries(adjacencyList)
			.filter(([key]) => key !== nodeId)
			.map(([key, list]) => [key, list.filter((id) => id !== nodeId)]),
	);

	return adjacencyList;
};

export default {
	removeNode,
};
